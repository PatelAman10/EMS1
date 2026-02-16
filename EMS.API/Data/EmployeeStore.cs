using EMS.API.Models;

namespace EMS.API.Data
{
    public static class EmployeeStore
    {
        public static List<Employee> Employees = new()
        {
            new Employee { Id = 1, Name = "MS Dhoni", Email = "msd07@test.com", Role = "Boss", Salary = 600000 },
            new Employee { Id = 2, Name = "Virat Kohli", Email = "vk18@test.com", Role = "Manager", Salary = 550000 }
        };
    }
}
