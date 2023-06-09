import Header from "./components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListReserva from "./views/ListReserva";
import Cliente from "./views/Cliente";
import Restaurante from "./views/Restaurante";
import Mesa from "./views/Mesa";
import Reserva from "./views/Reserva";
import Categoria from "./views/Categoria";
import Producto from "./views/Producto";

function App() {
	return (
		<>
			<BrowserRouter>
				<Header />
				<Routes> 
					<Route path="/" element={<Cliente />} />
					<Route path="/restaurante" element={<Restaurante />} />
					<Route path="/mesa" element={<Mesa />} />
					<Route path="/reserva" element={<Reserva />} />
					<Route path="/listReserva" element={<ListReserva />} />
					<Route path="/categoria" element={<Categoria />} />
					<Route path="/categoria" element={<Categoria />} />
					<Route path="/producto" element={<Producto />} />
					<Route path="*" element={<p>Error</p>} /> 
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
