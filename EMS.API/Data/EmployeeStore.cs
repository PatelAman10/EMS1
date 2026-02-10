using EMS.API.Models;

namespace EMS.API.Data
{
    public static class EmployeeStore
    {
        public static List<Employee> Employees = new()
        {
            new Employee { Id = 1, Name = "John", Email = "john@test.com", Department = "HR", Salary = 30000 },
            new Employee { Id = 2, Name = "Sara", Email = "sara@test.com", Department = "IT", Salary = 50000 }
        };
    }
}
