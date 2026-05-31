var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

var app = builder.Build();

// mock data 
var workOrders = new List<WorkOrder>
{
    new(1, "Fix login issue", "Users are having trouble logging into the system.", "Open", "High", "Samarth", "Manager", "2026-05-27", "2026-06-01"),
    new(2, "Update dashboard table", "Add filtering and sorting to the dashboard table.", "In Progress", "Medium", "Alex", "Manager", "2026-05-26", "2026-06-03"),
    new(3, "Clean old database records", "Remove or archive old test records from the database.", "Completed", "Low", "Maya", "Admin", "2026-05-25", "2026-05-30"),
    new(4, "Repair printer connection", "Office printer is not reachable from user laptops.", "Open", "Urgent", "Jordan", "Admin", "2026-05-28", "2026-05-29"),
    new(5, "Replace broken keyboard", "Front desk keyboard has several unresponsive keys.", "Completed", "Low", "Taylor", "Manager", "2026-05-24", "2026-05-27"),
    new(6, "Investigate slow network", "Users report slow file uploads in the main office.", "In Progress", "High", "Riley", "Manager", "2026-05-29", "2026-06-04"),
};

app.MapGet("/", () => "WorkOrder API is running!");

app.MapGet("/workorders", () =>
{
    return workOrders;
});

app.MapGet('/workorder/{id}', (int id) => {

    WorkOrder? workOrder = workOrders.FirstOrDefault(w => w.Id == id);

    if (workOrder == null){
        return Results.NotFound();
    }
    
    return Results.Ok(workOrder);
    

});

app.MapPost('/workorders', (WorkOrder newWorkOrder) => {
    int nextId = workOrders.Count == 0 ? 1 : workOrders.Max(w => w.Id) + 1;

    WorkOrder workOrder = new WorkOrder(
        nextId,
        newWorkOrder.Title,
        newWorkOrder.Description,
        newWorkOrder.Status,
        newWorkOrder.Priority,
        newWorkOrder.AssignedTo,
        newWorkOrder.CreatedBy,
        newWorkOrder.CreatedAt,
        newWorkOrder.DueDate);

    workOrders.add(workOrder)

    return Results.Created($"/workorders/{workOrder.id}", workOrder);

});

app.MapPut('/workorders/{id}', (int id, WorkOrder updatedWorkOrders) => {

    int i = workorders.FindIndex(w => w.Id == id);

    if(i = -1){
        return Results.NotFound()
    }

    WorkOrder workOrder = new WorkOrder(
        i,
        updatedWorkOrders.Title,
        updatedWorkOrders.Description,
        updatedWorkOrders.Status,
        updatedWorkOrders.Priority,
        updatedWorkOrders.AssignedTo,
        updatedWorkOrders.CreatedBy,
        updatedWorkOrders.CreatedAt,
        updatedWorkOrders.DueDate);
    
    workorders[i] = workOrder;

    return Results.Ok(workOrder)

});






record WorkOrder(int Id, 
string Title, 
string Description, 
string Status, 
string Priority, 
string AssignedTo, 
string CreatedBy, 
string CreatedAt, 
string DueDate);































/*
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

var summaries = new[]
{
    "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
};

app.MapGet("/weatherforecast", () =>
{
    var forecast =  Enumerable.Range(1, 5).Select(index =>
        new WeatherForecast
        (
            DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            Random.Shared.Next(-20, 55),
            summaries[Random.Shared.Next(summaries.Length)]
        ))
        .ToArray();
    return forecast;
})
.WithName("GetWeatherForecast");

app.Run();

record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
*/