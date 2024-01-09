import { Schema, model } from "mongoose";

const schemaPdfDetails = new Schema(
  {
    pdf: String,
    title: String,
  },
  { collection: "PdfDetail" }
);

const schemaPdf = model("PdfDetails", schemaPdfDetails )

export default schemaPdf;
