import mongoose from "mongoose";

const pedidoSchema = new mongoose.Schema(
    {
        itemsPedido: [
            {
                txtProduct: { type: String, required: true },
                name: { type: String, required: true },
                cantidad: { type: Number, required: true },
                image: { type: String, required: true },
                price: { type: Number, required: true },
                producto: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: ("Producto"),
                    required: true,
                },
            },

        ],
        direccionEnvio: {
            nombre: { type: String, required: true },
            direccion: { type: String, required: true },
            ciudad: { type: String, required: true },
            comuna: { type: String, required: true },
            fono: { type: String, required: true },
        },

        resultadoPago: {
            id: String,
            status: String,
            update_time: String,
            email_address: String,
        },

        valorItem: { type: Number, required: true },
        valorEnvio: { type: Number, required: true },
        valorIVA: { type: Number, required: true },
        valorTotal: { type: Number, required: true },
        /*usuario: {
            type: mongoose.Schema.Types.ObjectId,
            ref: ("User"),
            required: true,
        },*/
        pagado: { type: Boolean, default: false },
        pagadoEn: { type: Date },
        enviado: { type: Boolean, default: false },
        enviadoEn: { type: Date }
    },
    {
        timestamps: true,
    }
);
const Pedido = mongoose.model("Pedido", pedidoSchema);
export default Pedido;