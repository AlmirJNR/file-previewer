using System.Diagnostics;
using Backend.Middlewares;
using Backend.Services;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddSingleton<DirectoryService>();
builder.Services.AddControllers();

var app = builder.Build();
if (app.Environment.IsDevelopment())
{
    app.UseCors(policyBuilder => policyBuilder
        .AllowAnyHeader()
        .AllowAnyMethod()
        .AllowAnyOrigin()
    );

    app.UseDeveloperExceptionPage();
}
else if (app.Environment.IsProduction())
{
    app.UseDefaultFiles();
    app.UseStaticFiles();

    // Opens the browser when the application starts
    Process.Start(new ProcessStartInfo
    {
        FileName = "http://localhost:5000/",
        UseShellExecute = true
    });
}
app.UseRouterHandler();

app.MapControllers();
app.Run();