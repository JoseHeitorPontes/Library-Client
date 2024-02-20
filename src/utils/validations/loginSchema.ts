import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
    email: Yup.string()
        .required("O email é obrigatório.").email("O email deve ser um email válido."),
    password: Yup.string()
        .required("A senha é obrigatória.").min(8, "A senha deve ser um senha válida."),
});