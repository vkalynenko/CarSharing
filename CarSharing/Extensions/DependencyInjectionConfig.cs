namespace CarSharing.Extensions
{
    public static class DependencyInjectionConfig
    {
        public static IServiceCollection RegisterDependencies(this IServiceCollection services,
            IConfiguration configuration)
        {
            RegisterServices(services);
            RegisterDataAccess(services, configuration);
            RegisterExceptionHandlers(services);

            return services;
        }

        private static void RegisterServices(IServiceCollection services)
        {
            
        }

        private static void RegisterDataAccess(this IServiceCollection services, IConfiguration configuration)
        {
           
        }

        private static void RegisterExceptionHandlers(this IServiceCollection services)
        {
           
        }
    }
}
}
