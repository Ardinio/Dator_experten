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

    public class LaptopsController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;

        public LaptopsController(IConfiguration configuration, IWebHostEnvironment env)
        {
            _configuration = configuration;
            _env = env;
        }

        [HttpGet("{id}")]

        public JsonResult Get(int id)
        {
            string query =@"
                    exec Get_Laptop
                        @pid = "+id+@"";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("Computer_ExpertAppCon");
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

        [Route("GetAllLaptops")]

        public JsonResult GetAllLaptops()
        {
            string query =@"
                    exec Get_all_Laptops";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("Computer_ExpertAppCon");
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

        public JsonResult Post(Laptops laptops)
        {
             string query =@"
                    declare @responseMessage nvarchar(250)

                    exec dbo.Add_Laptop
                        @pproduct_name = '"+laptops.ProductName+@"',
                        @pproduct_image = '"+laptops.ProductImage+@"',
                        @pmodel = '"+laptops.Model+@"',
                        @pinformation = '"+laptops.Information+@"',
                        @pprice = '"+laptops.Price+@"',
                        @pspecification = '"+laptops.Specification+@"',
                        @responseMessage = @responseMessage output";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("Computer_ExpertAppCon");
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

        public JsonResult Put(Laptops laptops)
        {
             string query =@"
                    declare @responseMessage nvarchar(250)

                    exec dbo.Update_Laptop
                        @pproduct_name= '"+laptops.ProductName+@"',
                        @pproduct_image = '"+laptops.ProductImage+@"',
                        @pmodel = '"+laptops.Model+@"',
                        @pinformation = '"+laptops.Information+@"',
                        @pprice = '"+laptops.Price+@"',
                        @pspecification = '"+laptops.Specification+@"',
                        @pid = "+laptops.LaptopId+@",
                        @responseMessage = @responseMessage output";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("Computer_ExpertAppCon");
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
                    exec dbo.Delete_Laptop
                        @pid = "+id+@"";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("Computer_ExpertAppCon");
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