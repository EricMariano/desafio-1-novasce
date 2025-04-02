import logoverde1 from "../assets/logoverde1.png"

export default function Header() {
    return (
        <header className='p-2.5 gap-2.5 flex justify-center'>
            <div className='max-w-5xl mx-auto p-2.5 '>
                <img src={logoverde1} alt="logonovasce" className='p-2.5' />
            </div>
        </header>
    )
}
