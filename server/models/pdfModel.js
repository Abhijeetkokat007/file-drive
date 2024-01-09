import { Schema, model } from "mongoose";

const PdfDetailsSchema = new Schema(
  {
    pdf: String,
    title: String,
  },
  { collection: "PdfDetails" }
);


const PdfModel = model("PdfModel" , PdfDetailsSchema)

export default PdfModel