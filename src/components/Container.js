import styles from'./Container.css'

function Container(props){
    
    return (
        <div className={`${styles.container} ${styles[props.customClass]}`}>
            {props.children}
        </div>)
}

export default Container