﻿//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace InternshipProject.Models
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class MDComSampleEntities1 : DbContext
    {
        public MDComSampleEntities1()
            : base("name=MDComSampleEntities1")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<Book> Books { get; set; }
        public virtual DbSet<BookCopy> BookCopies { get; set; }
        public virtual DbSet<Client> Clients { get; set; }
        public virtual DbSet<Lending> Lendings { get; set; }
        public virtual DbSet<Library> Libraries { get; set; }
        public virtual DbSet<Publisher> Publishers { get; set; }
        public virtual DbSet<sysdiagram> sysdiagrams { get; set; }
    }
}
