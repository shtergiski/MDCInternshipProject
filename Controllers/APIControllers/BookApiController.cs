using InternshipProject.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace InternshipProject.Controllers.APIControllers
{
    [Route("Books")]
    public class BookApiController : ApiController
    {
        private MDComSampleEntities1 db = new MDComSampleEntities1();

        [HttpGet]
        [Route("Books/GetAllBooks")]
        public IHttpActionResult GetAllBooks()
        {
            var books = db.Books.ToList();
            return Ok(books);
        }

        [HttpGet]
        [Route("Books/GetBookById/{id}")]
        public IHttpActionResult GetBookById(int id)
        {
            var book = db.Books.FirstOrDefault(x => x.BookID == id);
            if (book != null)
                return Ok(book);
            else
                return NotFound();
        }

        [HttpPost]
        [Route("Books/SaveBooks")]
        public IHttpActionResult SaveBooks(Book book)
        {
            if (book.BookID > 0)
            {
                var dbBook = db.Books.FirstOrDefault(x => x.BookID == book.BookID);
                dbBook.Title = book.Title;
                dbBook.YearOfIssue = book.YearOfIssue;
                dbBook.NumberOfPages = book.NumberOfPages;
                dbBook.Publisher = book.Publisher;
                dbBook.Publisher1 = book.Publisher1;


                db.SaveChanges();
            }
            else
            {
                db.Books.Add(book);
                db.SaveChanges();
            }
            return Ok(book.BookID);
        }

        [HttpPost]
        [Route("Books/AddNewBook")]
        public IHttpActionResult AddNewBook(Book book)
        {
            db.Books.Add(book);
            db.SaveChanges();
            return Ok(book);
        }

        [HttpPost]
        [Route("books/UpdateBook")]
        public IHttpActionResult UpdateBook(Book book)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Entry(book).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BookExists(book.BookID))
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
        [Route("Books/DeleteBook")]
        public IHttpActionResult DeleteBook(Book book)
        {
            Book b = db.Books.Find(book.BookID);
            if (b == null)
            {
                return NotFound();
            }
            db.Books.Remove(b);
            db.SaveChanges();
            return Ok("Success");
        }

        private bool BookExists(int id)
        {
            return db.Books.Count(e => e.BookID == id) > 0;
        }
    }
}