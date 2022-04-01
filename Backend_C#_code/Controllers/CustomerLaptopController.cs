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

namespace Backend_C__code.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class CustomerLaptopController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public CustomerLaptopController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]

        public JsonResult Get(CustomerLaptop customerLaptop)
        {
            string query =@"
                    exec Get_Customer_Laptop
                        @pcustomer_id = "+customerLaptop.CustomerId+@"";
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

        public JsonResult Post(CustomerLaptop customerLaptop)
        {
             string query =@"
                    declare @responseMessage nvarchar(250)

                    exec dbo.Add_Customer_Laptop
                        @pcustomer_id = "+customerLaptop.CustomerId+@",
                        @plaptop_id = "+customerLaptop.LaptopId+@",
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

        //[HttpPut]

        // public JsonResult Put(Laptops laptops)
        // {
        //      string query =@"
        //             exec dbo.Update_Laptop
        //                 @pproduct_name= '"+laptops.ProductName+@"',
        //                 @pproduct_image = '"+laptops.ProductImage+@"',
        //                 @pmodel = '"+laptops.Model+@"',
        //                 @pinformation = '"+laptops.Information+@"',
        //                 @pprice = '"+laptops.Price+@"',
        //                 @pspecification = '"+laptops.Specification+@"',
        //                 @pid = "+laptops.LaptopId+@"";
        //     DataTable table = new DataTable();
        //     string sqlDataSource = _configuration.GetConnectionString("Customer_and_ProductAppCon");
        //     SqlDataReader myReader;
        //     using(SqlConnection myCon = new SqlConnection(sqlDataSource))
        //     {
        //         myCon.Open();
        //         using (SqlCommand myCommand = new SqlCommand(query, myCon))
        //         {
        //             myReader = myCommand.ExecuteReader();
        //             table.Load(myReader);

        //             myReader.Close();
        //             myCon.Close();
        //         }
        //     }

        //     return new JsonResult("Update Successfully");
        // }
        
        [HttpDelete]

        public JsonResult Delete(CustomerLaptop customerLaptop)
        {
             string query =@"
                    exec dbo.Delete_Customer_Laptop
                        @pcustomer_id = "+customerLaptop.CustomerId+@",
                        @plaptop_id = "+customerLaptop.LaptopId+@"";
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
    }
}