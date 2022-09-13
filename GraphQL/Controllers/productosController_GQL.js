import Api_Prod from "../../APIs/API_Productos.js"

export async function getProductos() {
    const productos = await Api_Prod.allProducts()
    return productos.map(p => {
        return {id: p._id, nombre: p.TITLE, precio: p.PRICE, imagen: p.THUMBNAIL}
    })
}

export async function getProducto({ id }) {
    const productoBuscado = await Api_Prod.getProdById(id)
    return {id: productoBuscado._id,
            nombre: productoBuscado.TITLE,
            precio: productoBuscado.PRICE,
            imagen: productoBuscado.THUMBNAIL
        }
}

export async function createProducto({ datos }) {
    let productoNuevo = {
            TITLE: datos.nombre,
            PRICE: datos.precio,
            THUMBNAIL: datos.imagen,
        }
    productoNuevo = await Api_Prod.CreateNewProd(productoNuevo)
    return {id: productoNuevo._id,
            nombre: productoNuevo.TITLE,
            precio: productoNuevo.PRICE,
            imagen: productoNuevo.THUMBNAIL
        }
}

export async function updateProducto({ id, datos }) {
    const nuevosDatos = {
        PRICE: datos.precio,
        THUMBNAIL: datos.imagen,
    }
    const productoActualizado = await Api_Prod.UpdateProd(id, nuevosDatos)
    return {id: productoActualizado._id,
        nombre: productoActualizado.TITLE,
        precio: productoActualizado.PRICE,
        imagen: productoActualizado.THUMBNAIL
    }
}

export async function deleteProducto({ id }) {
    return {OK: await Api_Prod.deleteProdById(id)}
}

//{TITLE:datos.nombre, PRICE: datos.precio, THUMBANIL: datos.imagen}