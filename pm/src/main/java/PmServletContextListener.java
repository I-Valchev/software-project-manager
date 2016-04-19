import services.DevelopersService;
import services.EntityManagerService;
import services.ProjectManagersService;
import services.ProjectsService;
import services.UsersService;

import com.google.inject.Guice;
import com.google.inject.Injector;
import com.google.inject.servlet.GuiceServletContextListener;
import com.google.inject.servlet.ServletModule;

public class PmServletContextListener extends GuiceServletContextListener {

	public static Injector injector;

	@Override
	protected Injector getInjector() {
		if (injector == null) {
			injector = Guice.createInjector(new ServletModule() {
				@Override
				protected void configureServlets() {
					bind(ProjectsService.class);
					bind(ProjectManagersService.class);
					bind(EntityManagerService.class);
					bind(UsersService.class);
					bind(DevelopersService.class);
				}
			});
		}

		return injector;
	}
}