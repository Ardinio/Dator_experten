using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;
using System.Data;
using Backend_C__code.Models;
using System.IO;
using Microsoft.AspNetCore.Hosting;

namespace Backend_C__code.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class CustomerController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;

        public CustomerController(IConfiguration configuration, IWebHostEnvironment env)
        {
            _configuration = configuration;
            _env = env;
        }

        [HttpGet]

        public JsonResult Get(Customer customer)
        {
            string query =@"
                    declare	@responseMessage nvarchar(250)

                    exec Get_Customer @pemail = '"+customer.Email+@"', 
                    @ppassword_hash = '"+customer.Password+@"',
                    @responseMessage = @responseMessage output
                    
                    select @responseMessage as N'@responseMessage'";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("Customer_and_ProductAppCon");
            SqlDataReader myReader;
            using(SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);

        }

        [HttpPost]

        public JsonResult Post(Customer customer)
        {
             string query =@"
                    declare	@responseMessage nvarchar(250)

                    exec dbo.Add_Customer_Information
                        @pfirst_name = '"+customer.FirstName+@"',
                        @plast_name = '"+customer.LastName+@"',
                        @pprofile_image = '"+customer.ProfileImage+@"',
                        @pemail = '"+customer.Email+@"',
                        @page = '"+customer.Age+@"',
                        @ppassword_hash = '"+customer.Password+@"',
                        @responseMessage = @responseMessage output";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("Customer_and_ProductAppCon");
            SqlDataReader myReader;
            using(SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Added Successfully");
        }

        [HttpPut]

        public JsonResult Put(Customer customer)
        {
             string query =@"
                    declare	@responseMessage nvarchar(250)

                    exec dbo.Update_Customer_Information
                        @pfirst_name = '"+customer.FirstName+@"',
                        @plast_name = '"+customer.LastName+@"',
                        @pprofile_image = '"+customer.ProfileImage+@"',
                        @pemail = '"+customer.Email+@"',
                        @page = '"+customer.Age+@"',
                        @ppassword_hash = '"+customer.Password+@"',
                        @pid = "+customer.CustomerId+@",
                        @responseMessage = @responseMessage output";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("Customer_and_ProductAppCon");
            SqlDataReader myReader;
            using(SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Update Successfully");
        }
        
        [HttpDelete("{id}")]

        public JsonResult Delete(int id)
        {
             string query =@"
                    exec dbo.Delete_Customer
                        @pid = "+id+@"";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("Customer_and_ProductAppCon");
            SqlDataReader myReader;
            using(SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Deleted Successfully");
        }

        [Route("SaveFile")]
        [HttpPost]

        public JsonResult SaveFile()
        {
            try
            {
                var httpRequest = Request.Form;
                var postedFile = httpRequest.Files[0];
                string filename = postedFile.FileName;
                var physicalPath = _env.ContentRootPath + "/Images/" + filename;

                using(var stream = new FileStream(physicalPath, FileMode.Create))
                {
                    postedFile.CopyTo(stream);
                }

                return new JsonResult(filename);
            }
            catch (System.Exception)
            {
                return new JsonResult("anonymous.png");
            }
        }

    }
}