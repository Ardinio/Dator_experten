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

    public class UserController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;

        public UserController(IConfiguration configuration, IWebHostEnvironment env)
        {
            _configuration = configuration;
            _env = env;
        }

        [HttpGet]

        public JsonResult Get(User user)
        {
            string query =@"
                    declare	@responseMessage nvarchar(250)

                    exec Get_User @pemail = '"+user.Email+@"', 
                    @ppassword_hash = '"+user.Password+@"',
                    @responseMessage = @responseMessage output
                    
                    select @responseMessage as N'@responseMessage'";
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
        
        [Route("GetOneUser")]

        [HttpPost]

        public JsonResult GetOneUser(User user)
        {
            string query =@"
                    declare	@responseMessage nvarchar(250)

                    exec Get_User @pemail = '"+user.Email+@"', 
                    @ppassword_hash = '"+user.Password+@"',
                    @responseMessage = @responseMessage output
                    
                    select @responseMessage as N'@responseMessage'";
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

        public JsonResult Post(User user)
        {
             string query =@"
                    declare	@responseMessage nvarchar(250)

                    exec dbo.Add_User_Information
                        @pfirst_name = '"+user.FirstName+@"',
                        @plast_name = '"+user.LastName+@"',
                        @pprofile_image = '"+user.ProfileImage+@"',
                        @pemail = '"+user.Email+@"',
                        @page = '"+user.Age+@"',
                        @ppassword_hash = '"+user.Password+@"',
                        @responseMessage = @responseMessage output
                        
                    select @responseMessage as N'@responseMessage'";
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

        public JsonResult Put(User user)
        {
             string query =@"
                    declare	@responseMessage nvarchar(250)

                    exec dbo.Update_User_Information
                        @pfirst_name = '"+user.FirstName+@"',
                        @plast_name = '"+user.LastName+@"',
                        @pprofile_image = '"+user.ProfileImage+@"',
                        @pemail = '"+user.Email+@"',
                        @page = '"+user.Age+@"',
                        @ppassword_hash = '"+user.Password+@"',
                        @pid = "+user.UserId+@",
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
                    exec dbo.Delete_User
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