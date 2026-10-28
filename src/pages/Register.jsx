import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const schema = Yup.object({
  nombre: Yup.string().trim().min(3, "Mínimo 3 caracteres").required("El nombre es obligatorio"),
  correo: Yup.string().email("Correo electrónico no válido").required("El correo es obligatorio"),
  contrasena: Yup.string()
    .min(6, "Mínimo 6 caracteres")
    .matches(/\d/, "Debe incluir al menos un número")
    .required("La contraseña es obligatoria"),
  confirmar: Yup.string()
    .oneOf([Yup.ref("contrasena")], "Las contraseñas no coinciden")
    .required("Confirma tu contraseña"),
});

export default function Register({ onRegister }) {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { nombre: "", correo: "", contrasena: "", confirmar: "" },
    validationSchema: schema,
    onSubmit: (values) => {
      // Solo se guarda nombre y correo: nunca guardes la contraseña en localStorage
      onRegister({ nombre: values.nombre.trim(), correo: values.correo });
      navigate("/");
    },
  });

  const field = (name, label, type = "text") => (
    <>
      <label htmlFor={name}>{label}</label>
      <input id={name} type={type} {...formik.getFieldProps(name)} />
      {formik.touched[name] && formik.errors[name] && (
        <span className="error">{formik.errors[name]}</span>
      )}
    </>
  );

  return (
    <div className="auth">
      <h1>Crear cuenta</h1>
      <form className="form" onSubmit={formik.handleSubmit} noValidate>
        {field("nombre", "Nombre")}
        {field("correo", "Correo electrónico", "email")}
        {field("contrasena", "Contraseña", "password")}
        {field("confirmar", "Confirmar contraseña", "password")}
        <button type="submit" className="btn">Crear cuenta</button>
      </form>
    </div>
  );
}
