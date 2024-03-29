import { useState } from "react";
import { obtenerCursos } from "../firebase";
import { useDocs } from "../hooks/useDocs";
import { useTitle } from "../hooks/useTitle";

import FiltroPublicaciones from "../components/FiltroPublicaciones";
import Publicacion from '../components/Publicacion';

function PaginaCursos(){
    useTitle("Cursos | SkillUp");
    
    // Custom hook que obtiene los documentos de la función de firebase
    let { cargando, documentos, setDocumentos } = useDocs(obtenerCursos);
    let [filtradas, setFiltradas] = useState([]);

    const actualizarEstadoDocumento = (docId, nuevoEstado) => {
        let documentosActualizados = [...documentos].map(documento => {
            if(documento.id != docId) return documento;

            let documentoActualizado = {
                id: documento.id,
                data: {...documento.data}
            }
            documentoActualizado.data.estado = nuevoEstado;
            
            return documentoActualizado;
        });
        setDocumentos(documentosActualizados);
    }

    return(
        <div className="contenedor">
            <h1 className="titulo">Cursos</h1>

            <FiltroPublicaciones publicaciones={documentos} setFiltradas={setFiltradas}/>

            <div className="publicaciones">
                <p className="publicaciones__total">Total: {filtradas.length}</p>
                {
                    cargando ? (
                        // Si está cargando se muestra el texto
                        <h3 className="titulo">Cargando cursos...</h3>
                    ) : (
                        filtradas.length ? (
                            //Si hay publicaciones, se muestran
                            filtradas.map(doc => (
                                <Publicacion documento={doc} tipo={"curso"} key={doc.id} actualizarEstadoDocumento={actualizarEstadoDocumento}/>
                            ))
                        ) : (
                            // Si no hay publicaciones, se muestra que no hay cursos
                            <h3 className="titulo">No hay cursos</h3>
                        )
                    )
                }
            </div>
        </div>
    )
}

export default PaginaCursos;