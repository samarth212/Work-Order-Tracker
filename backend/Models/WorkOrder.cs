namespace backend.Models;

public record WorkOrder(int Id, 
string Title, 
string Description, 
string Status, 
string Priority, 
string AssignedTo, 
string CreatedBy, 
string CreatedAt, 
string DueDate);

