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
    [Route("BookCopies")]
    public class BookCopiesAPIController : ApiController
    {
        private MDComSampleEntities1 db = new MDComSampleEntities1();

        [HttpGet]
        [Route("BookCopies/GetAllBookCopies")]
        public IHttpActionResult GetAllBookCopies()
        {
            var bookCopies = db.BookCopies.ToList();
            return Ok(bookCopies);
        }

        [HttpGet]
        [Route("BookCopies/GetBookCopiesById/{id}")]
        public IHttpActionResult GetBookCopiesById(int id)
        {
            var bookCopies = db.BookCopies.FirstOrDefault(x => x.BookCopiesID == id);
            if (bookCopies != null)
                return Ok(bookCopies);
            else
                return NotFound();
        }

        [HttpPost]
        [Route("BookCopies/SaveBookCopies")]
        public IHttpActionResult SaveBookCopies(BookCopy bookCopy)
        {
            if (bookCopy.BookCopiesID > 0)
            {
                var dbBookCopies = db.BookCopies.FirstOrDefault(x => x.BookCopiesID == bookCopy.BookCopiesID);
                dbBookCopies.Book = bookCopy.Book;
                dbBookCopies.Library = bookCopy.Library;
                dbBookCopies.NumberOfCopies = bookCopy.NumberOfCopies;

                db.SaveChanges();
            }
            else
            {
                db.BookCopies.Add(bookCopy);
                db.SaveChanges();
            }
            return Ok(bookCopy.BookCopiesID);
        }


        [HttpPost]
        [Route("BookCopies/AddNewBookCopy")]
        public IHttpActionResult AddNewBookCopy(BookCopy bookCopy)
        {
            db.BookCopies.Add(bookCopy);
            db.SaveChanges();
            return Ok(bookCopy);
        }

        [HttpPost]
        [Route("BookCopies/UpdateBookCopy")]
        public IHttpActionResult UpdateBookCopy(BookCopy bookCopy)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Entry(bookCopy).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BookCopyExists(bookCopy.BookCopiesID))
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
        [Route("BookCopies/DeleteBookCopy")]
        public IHttpActionResult DeleteBookCopy(BookCopy bookCopy)
        {
            BookCopy bcopy = db.BookCopies.Find(bookCopy.BookCopiesID);
            if (bcopy == null)
            {
                return NotFound();
            }
            db.BookCopies.Remove(bcopy);
            db.SaveChanges();
            return Ok("Success");
        }

        private bool BookCopyExists(int id)
        {
            return db.BookCopies.Count(e => e.BookCopiesID == id) > 0;
        }
    }
}