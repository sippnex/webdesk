import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UnsavedChangesDialogComponent, UnsavedChangesDialogResult, DeleteConfirmDialogComponent} from '@webdesk/core';
import {MatDialog} from '@angular/material/dialog';
import {WorkflowDecisionNode} from "../../../model/workflow-decision-node.interface";
import {WorkflowDecisionEndpointTrue} from "../../../model/workflow-decision-endpoint-true.interface";
import {WorkflowNode} from "../../../model/workflow-node.interface";
import {WorkflowTransition} from "../../../model/workflow-transition.interface";
import {WorkflowFormElement} from "../../../model/workflow-form-element.interface";
import {
  WorkflowFormSelectElement,
  WorkflowFormSelectOption
} from "../../../model/workflow-form-select-element.interface";
import {WorkflowFormTextElement} from "../../../model/workflow-form-text-element.interface";
import {WorkflowDecisionEndpointFalse} from "../../../model/workflow-decision-endpoint-false.interface";
import {WorkflowFormRichTextElement} from "../../../model/workflow-form-rich-text-element.interface";
import {WorkflowService} from "../../../workflow.service";
import {Workflow} from "../../../model/workflow.interface";
import {FormControl, FormGroup, Validators} from "@angular/forms";

declare const sigma: any;

const DECISION_NODE: WorkflowDecisionNode = {
  id: 1,
  name: 'Sonderurlaub?',
  endpointTrue: {
    id: 2,
    name: 'Sonderurlaub? -> True'
  },
  endpointFalse: {
    id: 3,
    name: 'Sonderurlaub? -> False'
  },
  condition: 'CDATA[${type===1}'
} as WorkflowDecisionNode;

DECISION_NODE.endpointTrue.parentNode = DECISION_NODE;
DECISION_NODE.endpointFalse.parentNode = DECISION_NODE;

const WORKFLOW_NODES: WorkflowNode[] = [
  DECISION_NODE,
  {id: 4, name: 'Beantragt bei Personalabteilung'} as WorkflowNode,
  {id: 5, name: 'Beantragt bei Vorgesetzten'} as WorkflowNode,
  {id: 6, name: 'Genehmigt'} as WorkflowNode,
  {id: 7, name: 'Abgelehnt'} as WorkflowNode
];

/*const WORKFLOW_TRANSITIONS: WorkflowTransition[] = [
  {id: 1, name: 'Beantragen', primary: true, undefined, WORKFLOW_NODES[0]},
  new WorkflowTransition(2, 'Beantragen bei Personalabteilung', false, (WORKFLOW_NODES[0] as WorkflowDecisionNode).endpointTrue, WORKFLOW_NODES[1]),
  new WorkflowTransition(3, 'Beantragen bei Vorgesetzten', false, (WORKFLOW_NODES[0] as WorkflowDecisionNode).endpointFalse, WORKFLOW_NODES[2]),
  new WorkflowTransition(4, 'Genehmigen', true, WORKFLOW_NODES[2], WORKFLOW_NODES[3]),
  new WorkflowTransition(5, 'Ablehnen', false, WORKFLOW_NODES[2], WORKFLOW_NODES[4])
];*/


const WORKFLOW_FORM_ELEMENTS: WorkflowFormElement[] = [
  {
    type: 'WorkflowFormSelectElement',
    id: 1,
    name: 'Urlaubsart',
    options: [
      {id: 1, value: 'Tarifurlaub'} as WorkflowFormSelectOption,
      {id: 2, value: 'Sonderurlaub'} as WorkflowFormSelectOption,
    ]
  } as WorkflowFormSelectElement,
  {type: 'WorkflowFormTextElement', id: 2, name: 'Mitarbeiter', maxLength: 50} as WorkflowFormTextElement,
  {type: 'WorkflowFormRichTextElement', id: 3, name: 'Beschreibung', maxLength: 255} as WorkflowFormRichTextElement,
];

type DrawnState = { stateId: number, x: number, y: number };
type DrawnTransition = { transitionId: number };

@Component({
  selector: 'app-admin-workflow-detail',
  templateUrl: './admin-workflow-detail.component.html',
  styleUrls: ['./admin-workflow-detail.component.css']
})
export class AdminWorkflowDetailComponent implements OnInit {

  private sigma: any;

  @ViewChild('workflowCanvas', {static: true}) workflowCanvas: ElementRef;

  workflow: Workflow;
  form: FormGroup = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', [Validators.required]),
  });

  displayedStateColumns: string[] = ['id', 'name', 'controls'];
  nodes: WorkflowNode[] = WORKFLOW_NODES;

  displayedTransitionColumns: string[] = ['id', 'name', 'sourceNode', 'targetNode', 'controls'];

  displayedFormElementsColumns: string[] = ['id', 'name', 'type', 'additionalOptions', 'controls'];
  formElements: WorkflowFormElement[] = WORKFLOW_FORM_ELEMENTS;

  constructor(private route: ActivatedRoute, private router: Router, private dialog: MatDialog, private workflowService: WorkflowService) {
  }

  ngOnInit(): void {
    this.form.get('id')!.disable();
    this.route.params.subscribe(params => {
      if (params.workflowId && params.workflowId !== '0') {
        this.workflowService.getWorkflowById(+params.workflowId).subscribe((workflow: Workflow) => {
          this.workflow = workflow;
          this.updateForm();
        });
        // this.drawWorkflow();
        this.sigma = new sigma(
          {
            renderer: {
              container: document.getElementById('sigma-container'),
              type: 'canvas'
            },
            settings: {
              maxEdgeSize: 4,
              maxNodeSize: 20,
              defaultLabelSize: 14,
              edgeLabelSize: 'proportional',
              edgeLabelSizePowRatio: 1.5,
              drawLabels: false,
              mouseWheelEnabled: false,
            }
          }
        );
        this.sigma.graph.read(this.getGraph());
        this.sigma.startForceAtlas2({
          worker: true,
          autoStop: true,
          background: false,
          scalingRatio: 0.5,
          adjustSizes: false,
          gravity: 0.1,
          barnesHutOptimize: true,
          barnesHutTheta: 0.1,
          slowDown: 3
        });
        setTimeout(() => {
          this.sigma.killForceAtlas2();
        }, 1000);
        this.sigma.refresh();
      } else {
        this.workflow = {
          name: '',
          formElements: [],
          transitions: [],
          nodes: []
        };
        this.updateForm();
      }
    });
  }

  public cancel(): void {
    this.router.navigate([`../list`], {relativeTo: this.route});
  }

  public save(refresh: boolean = true): void {
    this.updateModel();
    this.workflowService.saveWorkflow(this.workflow).subscribe((workflow: Workflow) => {
      if (refresh) {
        this.router.navigate([`../${workflow.id}`], {relativeTo: this.route});
      } else {
        this.workflow = workflow;
      }
    });
  }

  public async openWorkflowNode(node?: WorkflowNode): Promise<void> {
    this.router.navigate([`./nodes/${node ? node.id : 0}`], {relativeTo: this.route});
  }


  public async deleteWorkflowNode(node: WorkflowNode): Promise<void> {
    const dialogRef = this.dialog.open(DeleteConfirmDialogComponent);
    const result: boolean = await dialogRef.afterClosed().toPromise();
    console.log('result', result);
    if (result) {
      console.log('remove before', this.workflow.nodes);
      const index = this.workflow.nodes.findIndex(n => n.id === node.id);
      this.workflow.nodes.splice(index, 1);
      console.log('remove after', this.workflow.nodes);
      this.save(false);
    }
  }

  public async openWorkflowTransition(transition?: WorkflowTransition): Promise<void> {
    const confirmed = await this.checkFormState();
    if (confirmed) {
      this.router.navigate([`./transition/${transition ? transition.id : 0}`], {relativeTo: this.route});
    }
  }

  public async openWorkflowFormElement(formElement?: WorkflowFormElement): Promise<void> {
    const confirmed = await this.checkFormState();
    if (confirmed) {
      this.router.navigate([`./form-element/${formElement ? formElement.id : ''}`], {relativeTo: this.route});
    }
  }

  private updateForm(): void {
    this.form.reset();
    this.form.get('id')!.setValue(this.workflow?.id);
    this.form.get('name')!.setValue(this.workflow?.name);
  }

  private updateModel(): void {
    this.workflow = {
      ...this.workflow,
      id: this.form.get('id')!.value,
      name: this.form.get('name')!.value,
    }
  }

  public getTransitionIdText(transition: WorkflowTransition): string {
    return transition ? transition.id.toString() : '';
  }

  public getTransitionNameText(transition: WorkflowTransition): string {
    return transition ? transition.name : '';
  }

  public getTransitionSourceNodeText(transition: WorkflowTransition): string {
    return transition && transition.sourceNode ? transition.sourceNode.name : '';
  }

  public getTransitionTargetNodeText(transition: WorkflowTransition): string {
    return transition && transition.targetNode ? transition.targetNode.name : '';
  }

  public getFormElementIdText(formElement: WorkflowFormElement): string {
    return formElement ? formElement.id.toString() : '';
  }

  public getFormElementNameText(formElement: WorkflowFormElement): string {
    return formElement ? formElement.name : '';
  }

  public getFormElementTypeText(formElement: WorkflowFormElement): string {
    if (formElement.type === 'WorkflowFormTextElement') {
      return 'Textfeld';
    } else if (formElement.type === 'WorkflowFormRichTextElement') {
      return 'Freitextfeld';
    } else if (formElement.type === 'WorkflowFormSelectElement') {
      return 'Auswahlfeld';
    } else {
      return '';
    }
  }

  public getFormSelectElementOptions(formElement: WorkflowFormElement): WorkflowFormSelectOption[] {
    return formElement.type === 'WorkflowFormSelectElement' ? (formElement as WorkflowFormSelectElement).options : [];
  }

  public getFormElementAdditionalOptionsText(formElement: WorkflowFormElement): string {
    if (formElement.type === 'WorkflowFormTextElement' || formElement.type === 'WorkflowFormRichTextElement') {
      return `Maximale Länge: ${(formElement as WorkflowFormTextElement).maxLength}`;
    } else if (formElement.type === 'WorkflowFormSelectElement') {
      return `Auswahloptionen: ${(formElement as WorkflowFormSelectElement).options.map(option => option.value).join(', ')}`;
    } else {
      return '';
    }
  }

  private async checkFormState(): Promise<boolean> {
    if (this.form.dirty) {
      const dialogRef = this.dialog.open(UnsavedChangesDialogComponent, {});
      const result: UnsavedChangesDialogResult = await dialogRef.afterClosed().toPromise();
      if (result.action === 'save') {
        this.save();
        return true;
      } else if (result.action === 'discard') {
        this.updateForm();
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }

  private getGraph(): any {
    console.log('??', this.workflow);
    const graph = {nodes: [], edges: []};
    // @ts-ignore
    graph.nodes.push({id: 0, label: '0: Start', x: 0, y: 0, size: 30, color: '#818181'});
    this.nodes.forEach((node, i) => {
      // @ts-ignore
      graph.nodes.push({id: node.id, label: `${node.id}: ${node.name}`, x: 1 + (i * 20), y: 1 + (i * 2), size: 20, color: node.type === 'WorkflowDecisionNode' ? '#7e8ed4' : '#818181'});
    });
    this.workflow?.transitions.forEach(transition => {
      let sourceNodeId = transition.sourceNode ? transition.sourceNode.id : 0;
      let label = `${transition.id}: ${transition.name}`;
      let color = '#818181';
      if (transition.sourceNode!.type === 'WorkflowDecisionEndpointTrue') {
        sourceNodeId = (transition.sourceNode as WorkflowDecisionEndpointTrue).parentNode!.id;
        label = 'Ja --> ' + label;
        color = '#7ab374';
      } else if (transition.sourceNode!.type === 'WorkflowDecisionEndpointFalse') {
        sourceNodeId = (transition.sourceNode as WorkflowDecisionEndpointTrue).parentNode!.id;
        label = 'Nein --> ' + label;
        color = '#c37272';
      }
      // @ts-ignore
      graph.edges.push({id: transition.id, label, source: sourceNodeId, target: transition.targetNode!.id, color, type: 'curvedArrow', size: 3});
    });
    return graph;
  }

  private drawWorkflow(): void {
    const drawnStates: DrawnState[] = [];
    const drawnTransitions: DrawnTransition[] = [];
    const canvas = this.workflowCanvas.nativeElement;
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.font = '14px Arial';
    // draw start node
    const x = 50;
    const y = 50;
    ctx.arc(x, y, 40, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fillText('Start', x - 29, y + 5);
    const transitions = this.workflow?.transitions.filter(t => t.sourceNode == null);
    for (let i = 0; i < transitions.length; i++) {
      this.drawWorkflowTransition(ctx, x + 40, y, i, transitions.length, transitions[i], drawnStates, drawnTransitions);
    }
  }

  private drawWorkflowTransition(ctx: any, x: number, y: number, transitionIndex: number, totalTransitions: number, transition: WorkflowTransition, drawnStates: DrawnState[], drawnTransitions: DrawnTransition[]): void {
    const drawnState = drawnStates.find(ds => ds.stateId === transition.targetNode!.id);
    if (drawnState) {
      ctx.moveTo(x, y);
      ctx.lineTo(drawnState.x, drawnState.y);
      // ctx.fillText(transition.name, x - 110, y - 10);
      ctx.stroke();
    } else {
      ctx.moveTo(x, y);
      x += 140;
      y += (100 * totalTransitions) - (100 * totalTransitions) * ((transitionIndex + 1) / totalTransitions);
      ctx.lineTo(x - 40, y);
      ctx.fillText(transition.name, x - 110, y - 10);
      drawnTransitions.push({transitionId: transition.id});
      ctx.moveTo(x + 40, y);
      ctx.arc(x, y, 40, 0, 2 * Math.PI);
      drawnStates.push({stateId: transition.targetNode!.id!, x, y});
      ctx.stroke();
      ctx.fillText(transition.targetNode!.name, x - 29, y + 5);
    }
    const transitions = this.workflow?.transitions
      .filter(t => t.sourceNode && t.sourceNode.id === transition.targetNode!.id)
      .filter(t => drawnTransitions.filter(dt => dt.transitionId === t.id).length === 0);
    for (let i = 0; i < transitions.length; i++) {
      this.drawWorkflowTransition(ctx, x + 40, y, i, transitions.length, transitions[i], drawnStates, drawnTransitions);
    }
  }
}
