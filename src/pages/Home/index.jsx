import Navbar from "../Navbar";
import Cart from "../Cart";
import { useGlobalContext } from "../../Context";

function Home() {
    return <main>
        <Navbar />
        <div>
            <h1 style={{ fontSize: '4.5rem', padding: '60px 0 20px 0' }}>Your Bag</h1>
            <Cart />
        </div>
    </main>;
}

export default Home;