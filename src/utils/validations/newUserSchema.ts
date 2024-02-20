import * as Yup from "yup";

export const newUserSchema = Yup.object().shape({
    name: Yup.string()
        .required("O nome é obrigatório."),
    email: Yup.string()
        .required("O email é obrigatório.")
        .email("O email deve ser um email válido."),
    password: Yup.string()
        .required("A senha é obrigatória.")
        .min(8, "A senha deve ter no mínimo 8 caracteres."),
    confirmation_password: Yup.string()
        .required("A confirmação da senha é obrigatória.")
        .oneOf([Yup.ref("password"), ""], "As senhas não conferem."),
});