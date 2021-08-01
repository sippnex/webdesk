import {AfterViewChecked, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ModelFormBinding, UnsavedChangesProtector, DeleteConfirmDialogComponent} from '@webdesk/core';
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
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Workflow} from "../../../model/workflow.interface";
import {WorkflowService} from "../../../services/workflow.service";

declare const sigma: any;

/*const DECISION_NODE: WorkflowDecisionNode = {
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
];*/

type DrawnState = { stateId: number, x: number, y: number };
type DrawnTransition = { transitionId: number };

@Component({
  selector: 'app-workflow-detail',
  templateUrl: './workflow-detail.component.html',
  styleUrls: ['./workflow-detail.component.css']
})
export class WorkflowDetailComponent implements OnInit, ModelFormBinding, UnsavedChangesProtector {

  private sigma: any;

  @ViewChild('workflowCanvas', {static: true}) workflowCanvas: ElementRef;

  workflow: Workflow;
  form: FormGroup = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', [Validators.required]),
  });

  displayedStateColumns: string[] = ['id', 'name', 'controls'];
  displayedTransitionColumns: string[] = ['id', 'name', 'order', 'sourceNode', 'targetNode', 'controls'];
  displayedFormElementsColumns: string[] = ['id', 'name', 'type', 'additionalOptions', 'controls'];

  constructor(private route: ActivatedRoute, private router: Router, private dialog: MatDialog, private workflowService: WorkflowService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(async params => {
      await this.initModel(params);
      await this.initForm();
      await this.updateForm();
      this.renderWorkflow();
    });
  }

  public goBack(): void {
    this.router.navigate([`../`], {relativeTo: this.route});
  }

  public async openWorkflowNode(node?: WorkflowNode): Promise<void> {
    this.router.navigate([`./nodes/${node ? node.id : 0}`], {relativeTo: this.route});
  }

  public async openWorkflowTransition(transition?: WorkflowTransition): Promise<void> {
    this.router.navigate([`./transition/${transition ? transition.id : 0}`], {relativeTo: this.route});
  }

  public async openWorkflowFormElement(formElement?: WorkflowFormElement): Promise<void> {
    this.router.navigate([`./form-element/${formElement ? formElement.id : 0}`], {relativeTo: this.route});
  }

  public async deleteWorkflowNode(node: WorkflowNode): Promise<void> {
    const dialogRef = this.dialog.open(DeleteConfirmDialogComponent);
    const result: boolean = await dialogRef.afterClosed().toPromise();
    if (result) {
      const index = this.workflow.nodes.findIndex(n => n.id === node.id);
      this.workflow.nodes.splice(index, 1);
      this.saveChanges();
    }
  }

  public getFormElementIdText(formElement: WorkflowFormElement): string {
    return formElement && formElement.id ? formElement.id!.toString() : '';
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

  async initModel(params: Params): Promise<void> {
    if (params.workflowId && params.workflowId !== '0') {
      this.workflow = await this.workflowService.getWorkflowById(+params.workflowId).toPromise();
    } else {
      this.workflow = {
        name: '',
        formElements: [],
        transitions: [],
        nodes: []
      };
    }
  }

  initForm(): void {
    this.form.get('id')!.disable();
  }

  updateForm(): void {
    this.form.reset();
    this.form.get('id')!.setValue(this.workflow?.id);
    this.form.get('name')!.setValue(this.workflow?.name);
  }

  updateModel(): void {
    this.workflow = {
      ...this.workflow,
      id: this.form.get('id')!.value,
      name: this.form.get('name')!.value,
    }
  }

  hasUnsavedChanges(): boolean {
    return this.form.dirty;
  }

  isSaveEnabled(): boolean {
    return true;
  }

  async saveChanges(refresh: boolean = false): Promise<void> {
    this.updateModel();
    const workflow = await this.workflowService.saveWorkflow(this.workflow).toPromise();
    this.form.markAsPristine();
    if (refresh) {
      this.router.navigate([`../${workflow.id}`], {relativeTo: this.route, replaceUrl: true});
    } else {
      this.workflow = workflow;
    }
  }

  private renderWorkflow(): void {
    this.sigma = new sigma(
      {
        renderer: {
          container: this.workflowCanvas.nativeElement,
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
  }

  private getGraph(): any {
    const graph = {nodes: [], edges: []};
    // @ts-ignore
    graph.nodes.push({id: 0, label: '0: Start', x: 0, y: 0, size: 30, color: '#818181'});
    this.workflow.nodes.forEach((node, i) => {
      // @ts-ignore
      graph.nodes.push({id: node.id, label: `${node.id}: ${node.name}`, x: 1 + (i * 20), y: 1 + (i * 2), size: 20, color: node.type === 'WorkflowDecisionNode' ? '#7e8ed4' : '#818181'});
    });
    this.workflow.transitions.forEach(transition => {
      let sourceNodeId = transition.sourceNode ? transition.sourceNode.id : 0;
      let label = `${transition.id}: ${transition.name}`;
      let color = '#818181';
      if (transition.sourceNode?.type === 'WorkflowDecisionEndpointTrue') {
        sourceNodeId = (transition.sourceNode as WorkflowDecisionEndpointTrue).parentNode!.id;
        label = 'Ja --> ' + label;
        color = '#7ab374';
      } else if (transition.sourceNode?.type === 'WorkflowDecisionEndpointFalse') {
        sourceNodeId = (transition.sourceNode as WorkflowDecisionEndpointTrue).parentNode!.id;
        label = 'Nein --> ' + label;
        color = '#c37272';
      }
      // @ts-ignore
      graph.edges.push({id: transition.id, label, source: sourceNodeId, target: transition.targetNode!.id, color, type: 'curvedArrow', size: 3});
    });
    return graph;
  }

  /*private drawWorkflow(): void {
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
    const transitions = this.workflow.transitions.filter(t => t.sourceNode == null);
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
      drawnTransitions.push({transitionId: transition.id!});
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
  }*/
}
