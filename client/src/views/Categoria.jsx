import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const CategoriaContainer = styled.div`
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

const Categoria = () => {
    const [nombre, setNombre] = useState('');
    const [categorias, setCategorias] = useState([]);
    const [accion, setAccion] = useState(false);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/categoria`)
            .then((response) => {
                setCategorias(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [accion]);

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/categoria`, {
            nombre,
        })
            .then((response) => {
                setNombre('');
                setAccion(!accion);
            })
            .catch((error) => {
                console.log(error);
            }
            );
    };

    const handleEdit = categoria => {
        const nombre = prompt('Ingrese el nuevo nombre', categoria.nombre);

        axios.put(`${process.env.REACT_APP_API_BASE_URL}/api/categoria/${categoria.id}`, { nombre })
            .then(response => {
                const index = categorias.findIndex(r => r.id === categoria.id);
                const newCategorias = [...categorias];
                newCategorias[index] = response.data;
                setAccion(!accion);
            })
            .catch(error => console.log(error));
    };

    const handleDelete = categoria => {
        if (window.confirm(`¿Está seguro que desea eliminar la categoria ${categoria.nombre}?`)) {
            axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/categoria/${categoria.id}`)
                .then(() => {
                    setAccion(!accion);
                })
                .catch(error => console.log(error));
        }
    };


    return (
        <CategoriaContainer>
            <h2>Categorias</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Tipo"
                    value={nombre}
                    onChange={(event) => setNombre(event.target.value)}
                    required
                />
                <button type="submit">Crear Categoria</button>
            </form>

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {categorias.map((categoria) => (
                        <tr key={categoria.id}>
                            <td>{categoria.id}</td>
                            <td>{categoria.nombre}</td>
                            <td>
                                <button className='update' onClick={() => handleEdit(categoria)}>Editar</button>
                                <button className='delete' onClick={() => handleDelete(categoria)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </CategoriaContainer>
    );
};

export default Categoria;
