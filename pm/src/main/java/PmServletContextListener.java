import com.google.inject.Guice;
import com.google.inject.Injector;
import com.google.inject.servlet.GuiceServletContextListener;
import com.google.inject.servlet.ServletModule;

import services.EntityManagerService;
import services.ProjectManagersService;

public class PmServletContextListener extends GuiceServletContextListener {

	public static Injector injector;

	@Override
	protected Injector getInjector() {
		if (injector == null) {
			injector = Guice.createInjector(new ServletModule() {
				@Override
				protected void configureServlets() {
					bind(EntityManagerService.class);
					bind(ProjectManagersService.class);
				}
			});
		}

		return injector;
	}
}