export default function Die(props){
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }
    return <>
    <button 
    style={styles} 
    value={props.value}
    onClick={props.hold}
    >
        {props.value}
    </button>
    </>
}