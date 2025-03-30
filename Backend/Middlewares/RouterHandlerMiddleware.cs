using System.Text.RegularExpressions;

namespace Backend.Middlewares;

public static class RouterHandlerMiddlewareExtensions
{
    public static IApplicationBuilder UseRouterHandler(this IApplicationBuilder builder)
    {
        return builder.UseMiddleware<RouterHandlerMiddleware>();
    }
}

public partial class RouterHandlerMiddleware
{
    private readonly RequestDelegate _next;
    private readonly IEnumerable<string> _wildcardRoutes;

    [GeneratedRegex(@"\{[^}]*\}")]
    private static partial Regex ReplaceRoutePatternParamsRegex();

    public RouterHandlerMiddleware(RequestDelegate next, IEnumerable<EndpointDataSource> endpointDataSources)
    {
        _next = next;
        _wildcardRoutes = endpointDataSources
            .SelectMany(x => x.Endpoints)
            .Select(x =>
            {
                var routeEndpoint = x as RouteEndpoint ?? (RouteEndpoint)x;
                var routePattern = routeEndpoint.RoutePattern;
                var wildcardRoute = ReplaceRoutePatternParamsRegex()
                    .Replace(routePattern.RawText ?? string.Empty, ".*");

                return wildcardRoute;
            });
    }

    public async Task InvokeAsync(HttpContext httpContext)
    {
        var path = httpContext.Request.Path.Value ?? "/";
        if (path == "/")
        {
            await _next(httpContext);
            return;
        }

        var routeExists = _wildcardRoutes.Any(route => Regex.IsMatch(path, route, RegexOptions.IgnoreCase));
        if (!routeExists)
        {
            httpContext.Response.Redirect("/");
            return;
        }

        await _next(httpContext);
    }
}