using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using InternshipProject.Models;

namespace InternshipProject.Controllers.APIControllers
{
    [Route("Lendings")]
    public class LendingsAPIController : ApiController
    {
            private MDComSampleEntities1 db = new MDComSampleEntities1();

            [HttpGet]
            [Route("Lendings/GetAllLendings")]
            public IHttpActionResult GetAllLendings()
            {
                var lendings = db.Lendings.ToList();
                return Ok(lendings);
            }

            [HttpPost]
            [Route("Lendings/AddNewLending")]
            public IHttpActionResult AddNewLending(Lending lending)
            {
                db.Lendings.Add(lending);
                db.SaveChanges();
                return Ok(lending);
            }

        [HttpGet]
        [Route("Lendings/GetLendingsById/{id}")]
        public IHttpActionResult GetLendingsById(int id)
        {
            var lending = db.Lendings.FirstOrDefault(x => x.LendingID == id);
            if (lending != null)
                return Ok(lending);
            else
                return NotFound();
        }

        [HttpPost]
        [Route("Lendings/SaveLending")]
        public IHttpActionResult SaveLending(Lending lending)
        {
            if (lending.LendingID > 0)
            {
                var dbLendings = db.Lendings.FirstOrDefault(x => x.LendingID == lending.LendingID);
                dbLendings.Book = lending.Book;
                dbLendings.Client = lending.Client;
                dbLendings.DateOfLending = lending.DateOfLending;
                dbLendings.DateOfReturn = lending.DateOfReturn;

                db.SaveChanges();
            }
            else
            {
                db.Lendings.Add(lending);
                db.SaveChanges();
            }
            return Ok(lending.LendingID);
        }

            [HttpPost]
            [Route("Lendings/UpdateLending")]
            public IHttpActionResult UpdateLending(Lending lending)
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                db.Entry(lending).State = EntityState.Modified;

                try
                {
                    db.SaveChanges();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!LendingExists(lending.LendingID))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return Ok("Success");
            }


            [HttpPost]
            [Route("Lendings/DeleteLending")]
            public IHttpActionResult DeleteLending(Lending lending)
            {
                Lending len = db.Lendings.Find(lending.LendingID);
                if (len == null)
                {
                    return NotFound();
                }
                db.Lendings.Remove(len);
                db.SaveChanges();
                return Ok("Success");
            }

            private bool LendingExists(int id)
        {
            return db.Lendings.Count(e => e.LendingID == id) > 0;
        }
    }
}