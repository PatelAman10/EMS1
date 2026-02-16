using EMS.API.Data;
using EMS.API.Models;
using Microsoft.AspNetCore.Mvc;

namespace EMS.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmployeesController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(EmployeeStore.Employees);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var emp = EmployeeStore.Employees.FirstOrDefault(e => e.Id == id);
            if (emp == null) return NotFound();
            return Ok(emp);
        }

        [HttpPost]
        public IActionResult Add(Employee employee)
        {
            employee.Id = EmployeeStore.Employees.Any()
                ? EmployeeStore.Employees.Max(e => e.Id) + 1
                : 1;

            EmployeeStore.Employees.Add(employee);
            return Ok(employee);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, Employee updated)
        {
            var emp = EmployeeStore.Employees.FirstOrDefault(e => e.Id == id);
            if (emp == null) return NotFound();

            emp.Name = updated.Name;
            emp.Email = updated.Email;
            emp.Role = updated.Role;
            emp.Salary = updated.Salary;

            return Ok(emp);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var emp = EmployeeStore.Employees.FirstOrDefault(e => e.Id == id);
            if (emp == null) return NotFound();

            EmployeeStore.Employees.Remove(emp);
            return Ok();
        }
    }
}
