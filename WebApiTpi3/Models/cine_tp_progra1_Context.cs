﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace WebApiTpi.Models;

public partial class cine_tp_progra1_Context : DbContext
{
    public cine_tp_progra1_Context(DbContextOptions<cine_tp_progra1_Context> options)
        : base(options)
    {
    }

    public virtual DbSet<Butaca> Butacas { get; set; }

    public virtual DbSet<Calificacione> Calificaciones { get; set; }

    public virtual DbSet<Cargo> Cargos { get; set; }

    public virtual DbSet<Cartelera> Carteleras { get; set; }

    public virtual DbSet<Cliente> Clientes { get; set; }

    public virtual DbSet<DetalleCartelera> DetalleCarteleras { get; set; }

    public virtual DbSet<DetallesFactura> DetallesFacturas { get; set; }

    public virtual DbSet<Empleado> Empleados { get; set; }

    public virtual DbSet<Entrada> Entradas { get; set; }

    public virtual DbSet<Factura> Facturas { get; set; }

    public virtual DbSet<FormasPago> FormasPagos { get; set; }

    public virtual DbSet<Funcione> Funciones { get; set; }

    public virtual DbSet<Genero> Generos { get; set; }

    public virtual DbSet<Idioma> Idiomas { get; set; }

    public virtual DbSet<PaisesOrigene> PaisesOrigenes { get; set; }

    public virtual DbSet<Pelicula> Peliculas { get; set; }

    public virtual DbSet<Promocione> Promociones { get; set; }

    public virtual DbSet<Sala> Salas { get; set; }

    public virtual DbSet<TiposDocumento> TiposDocumentos { get; set; }

    public virtual DbSet<TiposProyeccione> TiposProyecciones { get; set; }

    public virtual DbSet<Usuario> Usuarios { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Butaca>(entity =>
        {
            entity.HasKey(e => e.IdButaca).HasName("pk_id_butaca");

            entity.Property(e => e.IdButaca).HasColumnName("id_butaca");
            entity.Property(e => e.Fila)
                .HasMaxLength(1)
                .IsUnicode(false)
                .IsFixedLength()
                .HasColumnName("fila");
            entity.Property(e => e.IdSala).HasColumnName("id_sala");
            entity.Property(e => e.Numero).HasColumnName("numero");

            entity.HasOne(d => d.IdSalaNavigation).WithMany(p => p.Butacas)
                .HasForeignKey(d => d.IdSala)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_id_sala_butaca");
        });

        modelBuilder.Entity<Calificacione>(entity =>
        {
            entity.HasKey(e => e.IdCalificacion).HasName("pk_id_calificacion");

            entity.Property(e => e.IdCalificacion).HasColumnName("id_calificacion");
            entity.Property(e => e.Calificacion)
                .IsRequired()
                .HasMaxLength(70)
                .IsUnicode(false)
                .HasColumnName("calificacion");
            entity.Property(e => e.EdadMinima).HasColumnName("edad_minima");
        });

        modelBuilder.Entity<Cargo>(entity =>
        {
            entity.HasKey(e => e.IdCargo).HasName("pk_id_cargo");

            entity.Property(e => e.IdCargo).HasColumnName("id_cargo");
            entity.Property(e => e.Cargo1)
                .IsRequired()
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("cargo");
            entity.Property(e => e.Descripcion)
                .HasMaxLength(150)
                .IsUnicode(false)
                .HasColumnName("descripcion");
            entity.Property(e => e.Sueldo)
                .HasColumnType("decimal(18, 0)")
                .HasColumnName("sueldo");
        });

        modelBuilder.Entity<Cartelera>(entity =>
        {
            entity.HasKey(e => e.IdCartelera).HasName("PK__Carteler__2A040F8C24A4CFBB");

            entity.ToTable("Cartelera");

            entity.Property(e => e.IdCartelera).HasColumnName("id_cartelera");
            entity.Property(e => e.FechaInicio)
                .HasColumnType("datetime")
                .HasColumnName("fechaInicio");
        });

        modelBuilder.Entity<Cliente>(entity =>
        {
            entity.HasKey(e => e.IdCliente).HasName("pk_id_cliente");

            entity.Property(e => e.IdCliente).HasColumnName("id_cliente");
            entity.Property(e => e.Apellido)
                .IsRequired()
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("apellido");
            entity.Property(e => e.Documento).HasColumnName("documento");
            entity.Property(e => e.Email)
                .HasMaxLength(75)
                .HasColumnName("email");
            entity.Property(e => e.FechaNacimiento).HasColumnName("fecha_nacimiento");
            entity.Property(e => e.IdTipoDocumento).HasColumnName("id_tipo_documento");
            entity.Property(e => e.IdUsuario).HasColumnName("id_usuario");
            entity.Property(e => e.Nombre)
                .IsRequired()
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("nombre");
            entity.Property(e => e.Telefono).HasColumnName("telefono");

            entity.HasOne(d => d.IdTipoDocumentoNavigation).WithMany(p => p.Clientes)
                .HasForeignKey(d => d.IdTipoDocumento)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_tipo_doc_cliente");

            entity.HasOne(d => d.IdUsuarioNavigation).WithMany(p => p.Clientes)
                .HasForeignKey(d => d.IdUsuario)
                .HasConstraintName("fk_clientes_usuarios");
        });

        modelBuilder.Entity<DetalleCartelera>(entity =>
        {
            entity.HasKey(e => e.IdDetalleCartelera).HasName("PK__Detalle___8784A37B42F7B7D7");

            entity.ToTable("Detalle_Cartelera");

            entity.Property(e => e.IdDetalleCartelera).HasColumnName("id_detalle_cartelera");
            entity.Property(e => e.IdCartelera).HasColumnName("id_cartelera");
            entity.Property(e => e.IdPelicula).HasColumnName("id_pelicula");

            entity.HasOne(d => d.IdCarteleraNavigation).WithMany(p => p.DetalleCarteleras)
                .HasForeignKey(d => d.IdCartelera)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Detalle_C__id_ca__14270015");

            entity.HasOne(d => d.IdPeliculaNavigation).WithMany(p => p.DetalleCarteleras)
                .HasForeignKey(d => d.IdPelicula)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Detalle_C__id_pe__151B244E");
        });

        modelBuilder.Entity<DetallesFactura>(entity =>
        {
            entity.HasKey(e => e.IdDetalleFactura).HasName("pk_id_detalle_factura");

            entity.ToTable("Detalles_facturas");

            entity.Property(e => e.IdDetalleFactura).HasColumnName("id_detalle_factura");
            entity.Property(e => e.CantidadEntradas).HasColumnName("cantidad_entradas");
            entity.Property(e => e.IdFactura).HasColumnName("id_factura");
            entity.Property(e => e.IdFuncion).HasColumnName("id_funcion");
            entity.Property(e => e.IdPromocion).HasColumnName("id_promocion");
            entity.Property(e => e.PrecioUnitario)
                .HasColumnType("decimal(18, 0)")
                .HasColumnName("precio_unitario");

            entity.HasOne(d => d.IdFacturaNavigation).WithMany(p => p.DetallesFacturas)
                .HasForeignKey(d => d.IdFactura)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_factura");

            entity.HasOne(d => d.IdFuncionNavigation).WithMany(p => p.DetallesFacturas)
                .HasForeignKey(d => d.IdFuncion)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_funcion");

            entity.HasOne(d => d.IdPromocionNavigation).WithMany(p => p.DetallesFacturas)
                .HasForeignKey(d => d.IdPromocion)
                .HasConstraintName("fk_promocion");
        });

        modelBuilder.Entity<Empleado>(entity =>
        {
            entity.HasKey(e => e.IdEmpleado).HasName("pk_id_empleado");

            entity.Property(e => e.IdEmpleado).HasColumnName("id_empleado");
            entity.Property(e => e.Apellido)
                .IsRequired()
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("apellido");
            entity.Property(e => e.Documento).HasColumnName("documento");
            entity.Property(e => e.Email)
                .HasMaxLength(75)
                .HasColumnName("email");
            entity.Property(e => e.FechaAlta).HasColumnName("fecha_alta");
            entity.Property(e => e.FechaNacimiento).HasColumnName("fecha_nacimiento");
            entity.Property(e => e.HorarioEntrada).HasColumnName("horario_entrada");
            entity.Property(e => e.HorarioSalida).HasColumnName("horario_salida");
            entity.Property(e => e.IdCargo).HasColumnName("id_cargo");
            entity.Property(e => e.IdTipoDocumento).HasColumnName("id_tipo_documento");
            entity.Property(e => e.IdUsuario).HasColumnName("id_usuario");
            entity.Property(e => e.Nombre)
                .IsRequired()
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("nombre");
            entity.Property(e => e.Telefono).HasColumnName("telefono");

            entity.HasOne(d => d.IdCargoNavigation).WithMany(p => p.Empleados)
                .HasForeignKey(d => d.IdCargo)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_cargo");

            entity.HasOne(d => d.IdTipoDocumentoNavigation).WithMany(p => p.Empleados)
                .HasForeignKey(d => d.IdTipoDocumento)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_tipo_doc_empleado");

            entity.HasOne(d => d.IdUsuarioNavigation).WithMany(p => p.Empleados)
                .HasForeignKey(d => d.IdUsuario)
                .HasConstraintName("fk_empleados_usuarios");
        });

        modelBuilder.Entity<Entrada>(entity =>
        {
            entity.HasKey(e => e.IdEntrada).HasName("pk_entrada");

            entity.Property(e => e.IdEntrada).HasColumnName("id_entrada");
            entity.Property(e => e.IdButaca).HasColumnName("id_butaca");
            entity.Property(e => e.IdDetalleFactura).HasColumnName("id_detalle_factura");

            entity.HasOne(d => d.IdButacaNavigation).WithMany(p => p.Entrada)
                .HasForeignKey(d => d.IdButaca)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_butaca");

            entity.HasOne(d => d.IdDetalleFacturaNavigation).WithMany(p => p.Entrada)
                .HasForeignKey(d => d.IdDetalleFactura)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_detalle");
        });

        modelBuilder.Entity<Factura>(entity =>
        {
            entity.HasKey(e => e.IdFactura).HasName("pk_id_factura");

            entity.Property(e => e.IdFactura).HasColumnName("id_factura");
            entity.Property(e => e.Estado)
                .IsRequired()
                .HasMaxLength(1)
                .IsUnicode(false)
                .IsFixedLength()
                .HasColumnName("estado");
            entity.Property(e => e.Fecha)
                .HasColumnType("datetime")
                .HasColumnName("fecha");
            entity.Property(e => e.IdCliente).HasColumnName("id_cliente");
            entity.Property(e => e.IdEmpleado).HasColumnName("id_empleado");
            entity.Property(e => e.IdFormaPago).HasColumnName("id_forma_pago");

            entity.HasOne(d => d.IdClienteNavigation).WithMany(p => p.Facturas)
                .HasForeignKey(d => d.IdCliente)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_cliente");

            entity.HasOne(d => d.IdEmpleadoNavigation).WithMany(p => p.Facturas)
                .HasForeignKey(d => d.IdEmpleado)
                .HasConstraintName("fk_empleado");

            entity.HasOne(d => d.IdFormaPagoNavigation).WithMany(p => p.Facturas)
                .HasForeignKey(d => d.IdFormaPago)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_forma_pago");
        });

        modelBuilder.Entity<FormasPago>(entity =>
        {
            entity.HasKey(e => e.IdFormaPago).HasName("pk_id_forma_pago");

            entity.ToTable("Formas_pagos");

            entity.Property(e => e.IdFormaPago).HasColumnName("id_forma_pago");
            entity.Property(e => e.FormaPago)
                .IsRequired()
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("forma_pago");
        });

        modelBuilder.Entity<Funcione>(entity =>
        {
            entity.HasKey(e => e.IdFuncion).HasName("pk_id_funcion");

            entity.Property(e => e.IdFuncion).HasColumnName("id_funcion");
            entity.Property(e => e.Fecha).HasColumnName("fecha");
            entity.Property(e => e.HorarioInicio).HasColumnName("horario_inicio");
            entity.Property(e => e.IdIdioma).HasColumnName("id_idioma");
            entity.Property(e => e.IdPelicula).HasColumnName("id_pelicula");
            entity.Property(e => e.IdSala).HasColumnName("id_sala");
            entity.Property(e => e.IdTipoProyeccion).HasColumnName("id_tipo_proyeccion");

            entity.HasOne(d => d.IdIdiomaNavigation).WithMany(p => p.Funciones)
                .HasForeignKey(d => d.IdIdioma)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_idioma");

            entity.HasOne(d => d.IdPeliculaNavigation).WithMany(p => p.Funciones)
                .HasForeignKey(d => d.IdPelicula)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_pelicula_funcion");

            entity.HasOne(d => d.IdSalaNavigation).WithMany(p => p.Funciones)
                .HasForeignKey(d => d.IdSala)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_sala_funcion");

            entity.HasOne(d => d.IdTipoProyeccionNavigation).WithMany(p => p.Funciones)
                .HasForeignKey(d => d.IdTipoProyeccion)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_tipo_proyeccion");
        });

        modelBuilder.Entity<Genero>(entity =>
        {
            entity.HasKey(e => e.IdGenero).HasName("pk_id_genero");

            entity.Property(e => e.IdGenero).HasColumnName("id_genero");
            entity.Property(e => e.Genero1)
                .IsRequired()
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("genero");
        });

        modelBuilder.Entity<Idioma>(entity =>
        {
            entity.HasKey(e => e.IdIdioma).HasName("pk_id_idioma");

            entity.Property(e => e.IdIdioma).HasColumnName("id_idioma");
            entity.Property(e => e.Idiomaa)
                .IsRequired()
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("idioma");
        });

        modelBuilder.Entity<PaisesOrigene>(entity =>
        {
            entity.HasKey(e => e.IdPaisOrigen).HasName("pk_id_pais");

            entity.ToTable("Paises_origenes");

            entity.Property(e => e.IdPaisOrigen).HasColumnName("id_pais_origen");
            entity.Property(e => e.Pais)
                .IsRequired()
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("pais");
        });

        modelBuilder.Entity<Pelicula>(entity =>
        {
            entity.HasKey(e => e.IdPelicula).HasName("pk_peliculas");

            entity.Property(e => e.IdPelicula).HasColumnName("id_pelicula");
            entity.Property(e => e.Director)
                .IsRequired()
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("director");
            entity.Property(e => e.Duracion).HasColumnName("duracion");
            entity.Property(e => e.Estado)
                 .HasMaxLength(10)
                .IsUnicode(false)
                .HasColumnName("estado");
            entity.Property(e => e.FechaEstreno)
                .HasColumnType("datetime")
                .HasColumnName("fecha_estreno");
            entity.Property(e => e.IdCalificacion).HasColumnName("id_calificacion");
            entity.Property(e => e.IdGenero).HasColumnName("id_genero");
            entity.Property(e => e.IdPaisOrigen).HasColumnName("id_pais_origen");
            entity.Property(e => e.Imagen).HasColumnName("imagen");
            entity.Property(e => e.Productora)
                .IsRequired()
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("productora");
            entity.Property(e => e.Sinopsis)
                .HasMaxLength(400)
                .IsUnicode(false)
                .HasColumnName("sinopsis");
            entity.Property(e => e.Titulo)
                .IsRequired()
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("titulo");

            entity.HasOne(d => d.IdCalificacionNavigation).WithMany(p => p.Peliculas)
                .HasForeignKey(d => d.IdCalificacion)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_calificacion_pelicula");

            entity.HasOne(d => d.IdGeneroNavigation).WithMany(p => p.Peliculas)
                .HasForeignKey(d => d.IdGenero)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_genero_pelicula");

            entity.HasOne(d => d.IdPaisOrigenNavigation).WithMany(p => p.Peliculas)
                .HasForeignKey(d => d.IdPaisOrigen)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_pais_pelicula");
        });

        modelBuilder.Entity<Promocione>(entity =>
        {
            entity.HasKey(e => e.IdPromocion).HasName("pk_id_promocin");

            entity.Property(e => e.IdPromocion).HasColumnName("id_promocion");
            entity.Property(e => e.Descripcion)
                .IsRequired()
                .HasMaxLength(150)
                .IsUnicode(false)
                .HasColumnName("descripcion");
            entity.Property(e => e.Descuento)
                .HasColumnType("decimal(18, 0)")
                .HasColumnName("descuento");
            entity.Property(e => e.FechaVigencia)
                .HasColumnType("datetime")
                .HasColumnName("fecha_vigencia");
        });

        modelBuilder.Entity<Sala>(entity =>
        {
            entity.HasKey(e => e.IdSala).HasName("pk_id_sala");

            entity.Property(e => e.IdSala).HasColumnName("id_sala");
            entity.Property(e => e.Capacidad).HasColumnName("capacidad");
            entity.Property(e => e.Nombre)
                .IsRequired()
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("nombre");
        });

        modelBuilder.Entity<TiposDocumento>(entity =>
        {
            entity.HasKey(e => e.IdTipoDocumento).HasName("pk_tipo_documento");

            entity.ToTable("Tipos_documentos");

            entity.Property(e => e.IdTipoDocumento).HasColumnName("id_tipo_documento");
            entity.Property(e => e.TipoDocumento)
                .IsRequired()
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("tipo_documento");
        });

        modelBuilder.Entity<TiposProyeccione>(entity =>
        {
            entity.HasKey(e => e.IdTipoProyeccion).HasName("pk_id_tipo_proyeccion");

            entity.ToTable("Tipos_proyecciones");

            entity.Property(e => e.IdTipoProyeccion).HasColumnName("id_tipo_proyeccion");
            entity.Property(e => e.TipoProyeccion)
                .IsRequired()
                .HasMaxLength(70)
                .IsUnicode(false)
                .HasColumnName("tipo_proyeccion");
        });

        modelBuilder.Entity<Usuario>(entity =>
        {
            entity.HasKey(e => e.IdUsuario).HasName("pk_id_usuario");

            entity.Property(e => e.IdUsuario).HasColumnName("id_usuario");
            entity.Property(e => e.Contra)
                .IsRequired()
                .HasMaxLength(30)
                .HasColumnName("contra");
            entity.Property(e => e.FechaCreacion)
                .HasColumnType("datetime")
                .HasColumnName("fecha_creacion");
            entity.Property(e => e.Tipo)
                .HasMaxLength(1)
                .IsUnicode(false)
                .IsFixedLength()
                .HasColumnName("tipo");
            entity.Property(e => e.Usuario1)
                .IsRequired()
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("usuario");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}