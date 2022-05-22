import styles from './Loading.css'
import loading from '../img/loading.svg'

function Loading(){
    return(
        <div className='container'>
            <div className={styles.loader_container}>
                <img className={styles.loader} src={loading} alt="Loading"/>
            </div>
        </div>
    )

}

export default Loading