import React from "react";
import { StyledRegisterVideo } from "./styles";
import { createClient } from "@supabase/supabase-js";

// Custom Hook
function useForm(propsDoForm) {
    const [values, setValues] = React.useState(propsDoForm.initialValues);

    return {
        values,
        handleChange: (evento) => {
            const value = evento.target.value;
            const name = evento.target.name
            setValues({
                ...values,
                [name]: value,
            });
        },
        clearForm() {
            setValues({});
        }
    };
}

const PROJECT_URL = "https://rdikhbyosbxjivmxiihc.supabase.co";
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJkaWtoYnlvc2J4aml2bXhpaWhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgyODQzNDUsImV4cCI6MTk4Mzg2MDM0NX0.r_FOX_n0_ErhLtVFOAZKs6X8RWnVHWlBzNZ1805gUOo";
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);

function getThumbnail(url) {
    return `https://img.youtube.com/vi/${url.split("v=")[1]}/hqdefault.jpg`;
}

export default function RegisterVideo() {
    const formCadastro = useForm({
        initialValues: {titulo: "7 Mind Blowing GTA Moments we Never Forgot", url: "https://www.youtube.com/watch?v=7ROM3F_qsGQ&list=LL&index=53"}
    });
    const [formVisivel, setFormVisivel] = React.useState(false);

    return (
        <StyledRegisterVideo>
            <button className="add-video" onClick={() => setFormVisivel(true)}>
                +
            </button>

            {formVisivel 
                ? (
                    <form onSubmit={(evento) => {
                        evento.preventDefault();

                        supabase.from("videos").insert({
                            title: formCadastro.values.titulo,
                            url: formCadastro.values.url,
                            thumb: getThumbnail(formCadastro.values.url),
                            playlist: "musica",
                        })
                        .then(() => {

                        })
                        .catch(() => {

                        })

                        setFormVisivel(false);
                        formCadastro.clearForm();
                    }}>
                        <div>
                            <button type="button" className="close-modal" onClick={() => setFormVisivel(false)}>
                                x
                            </button>
                            <input 
                            placeholder="Título do vídeo" 
                            name="titulo"
                            value={formCadastro.values.titulo} 
                            onChange={formCadastro.handleChange}
                            />

                            <input 
                            placeholder="URL" 
                            name="url"
                            value={formCadastro.values.url} 
                            onChange={formCadastro.handleChange}
                            />

                            <button type="submit">
                                Adicionar Vídeo
                            </button>
                        </div>
                </form>
                )
                : false}
        </StyledRegisterVideo>
    )
}