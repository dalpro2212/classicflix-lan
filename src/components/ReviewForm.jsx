import { useFormik } from "formik";
import * as Yup from "yup";

const schema = Yup.object({
  puntuacion: Yup.number()
    .typeError("Elige una puntuación")
    .min(1, "La puntuación mínima es 1")
    .max(5, "La puntuación máxima es 5")
    .required("La puntuación es obligatoria"),
  comentario: Yup.string()
    .trim()
    .min(10, "Escribe al menos 10 caracteres")
    .max(300, "Máximo 300 caracteres")
    .required("El comentario es obligatorio"),
});

export default function ReviewForm({ onSubmit }) {
  const formik = useFormik({
    initialValues: { puntuacion: "", comentario: "" },
    validationSchema: schema,
    onSubmit: (values, { resetForm }) => {
      onSubmit({ puntuacion: Number(values.puntuacion), comentario: values.comentario.trim() });
      resetForm();
    },
  });

  const error = (name) =>
    formik.touched[name] && formik.errors[name] ? (
      <span className="error">{formik.errors[name]}</span>
    ) : null;

  return (
    <form className="form" onSubmit={formik.handleSubmit} noValidate>
      <label htmlFor="puntuacion">Puntuación</label>
      <select id="puntuacion" {...formik.getFieldProps("puntuacion")}>
        <option value="">Selecciona…</option>
        {[1, 2, 3, 4, 5].map((n) => (
          <option key={n} value={n}>{n} {n === 1 ? "estrella" : "estrellas"}</option>
        ))}
      </select>
      {error("puntuacion")}

      <label htmlFor="comentario">Comentario</label>
      <textarea id="comentario" rows="3" {...formik.getFieldProps("comentario")} />
      {error("comentario")}

      <button type="submit" className="btn">Publicar reseña</button>
    </form>
  );
}
