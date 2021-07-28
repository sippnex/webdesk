package io.github.sippnex.webdesk.core;

import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@Configuration
@ComponentScan("io.github.sippnex.webdesk.core")
@EntityScan("io.github.sippnex.webdesk.core")
@EnableJpaRepositories("io.github.sippnex.webdesk.core")
public class CoreModuleConfig {
}
