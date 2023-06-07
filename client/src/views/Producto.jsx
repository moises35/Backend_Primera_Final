import axios from "axios"
import styled from "styled-components"
import { useEffect, useState } from "react"

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 2rem;

    h2 {
        font-size: 2rem;
        margin-bottom: 1rem;
    }

    form {
        display: flex;
        flex-direction: column;
        align-items: center;

        input {
            margin-bottom: 1rem;
            padding: 0.5rem;
            border-radius: 5px;
            border: none;
            box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.3);
            width: 20rem;
        }

        select {
            margin-bottom: 1rem;
            padding: 0.5rem;
            border-radius: 5px;
            border: none;
            box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.3);
            width: 20rem;
            font-size: 1rem;
        }

        .inline-inputs {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            width: 20rem;
            gap: 12px;
            input {
                width: 48%;
            }
        }

        button {
            padding: 0.5rem 1rem;
            border-radius: 5px;
            border: none;
            background-color: #1E90FF;
            color: white;
            font-weight: bold;
            cursor: pointer;
        }
    }

    table {
        border-collapse: collapse;
        margin-top: 2rem;
        
        th, td {
            padding: 0.5rem;
            border: 1px solid #ccc;

            button {
                padding: 0.5rem 1rem;
                border-radius: 5px;
                border: none;
                color: white;
                font-weight: bold;

                &:hover {
                    cursor: pointer;
                    box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.3);
                    opacity: 0.9;
                }

                &.update {
                    background-color: #008000;
                    margin-right: 1rem;
                }

                &.delete {
                    background-color: #FF0000;
                }

            }
        }

        th {
            background-color: #f2f2f2;
            text-align: center;
        }

        tr:nth-child(even) {
            background-color: #f2f2f2;
        }

        tr:hover {
            background-color: #ddd;
        }
    }
`;

const Producto = () => {
    const [productos, setProductos] = useState([]);
    const [nombre, setNombre] = useState('');
    const [precioVenta, setPrecioVenta] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [categorias, setCategorias] = useState([]);
    const [action, setAction] = useState(false);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/categoria`)
            .then((response) => {
                setCategorias(response.data)
            })
            .catch((error) => {
                console.log(error)
            })

        axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/producto`)
            .then((response) => {
                setProductos(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [action])


    const handleSubmit = event => {
        event.preventDefault();

        axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/producto`, {
            nombre,
            precioVenta,
            categoryId
        })
            .then((response) => {
                console.log(response);
                setAction(!action);
                setNombre('');
                setPrecioVenta('');
                setCategoryId('');
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const handleUpdate = producto => {
        const nombre = prompt("Ingrese el nuevo nombre (enter para mantener el mismo): ", producto.nombre);
        const precioVenta = prompt("Ingrese el nuevo precio de venta (enter para mantener el mismo): ", producto.precioVenta);
        const categoryId = prompt("Ingrese el nuevo id de categoria (enter para mantener el mismo): ", producto.categoryId);

        axios.put(`${process.env.REACT_APP_API_BASE_URL}/api/producto/${producto.id}`, {
            nombre: nombre ? nombre : producto.nombre,
            precioVenta: precioVenta ? precioVenta : producto.precioVenta,
            categoryId: categoryId ? categoryId : producto.categoryId
        })
            .then(() => {
                setAction(!action);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleDelete = producto => {
        if (window.confirm(`¿Está seguro que desea eliminar ${producto.nombre} de la lista?`)) {
            axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/producto/${producto.id}`)
                .then(() => {
                    setAction(!action);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    return (
        <Container>
            <h2>Producto</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Nombre del producto" 
                    value={nombre}
                    onChange={event => setNombre(event.target.value)}
                    required
                />
                <input 
                    type="text" 
                    placeholder="Precio de venta del producto" 
                    value={precioVenta}
                    onChange={event => setPrecioVenta(event.target.value)}
                    required
                />
                <select value={categoryId} onChange={event => setCategoryId(event.target.value)} required >
                    <option value="">Seleccione una categoria</option>
                    {categorias.map(categoria => (
                        <option key={categoria.id} value={categoria.id}>ID: {categoria.id} - {categoria.nombre}</option>
                    ))}
                </select>
                        
                <button type="submit">Agregar</button>
            </form>

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Precio de venta</th>
                        <th>ID Categoria</th>
                        <th>Categoria</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.map(producto => (
                        <tr key={producto.id}>
                            <td>{producto.id}</td>
                            <td>{producto.nombre}</td>
                            <td>{producto.precioVenta}</td>
                            <td>{producto.Categorium.id}</td>
                            <td>{producto.Categorium.nombre}</td>
                            <td>
                                <button className='update' onClick={() => handleUpdate(producto)}>Editar</button>
                                <button className='delete' onClick={() => handleDelete(producto)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Container>
    )
}

export default Producto