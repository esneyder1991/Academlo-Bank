const Transfer = require('../models/transfers.model');
const User = require('../models/users.model');
exports.transfer = async (req, res) => {
  try {
    const { amount, senderUserId, accountNumber } = req.body;

    //se busca el usuario que va a recibir el monto
    const UserReceiverTransfer = await User.findOne({
      where: {
        accountNumber,
        status: 'active',
      },
    });

    //se extrae el id de ese usuario que recibe el monto
    const receiverUserId = UserReceiverTransfer.id;

    //se busca el usuario que va enviar el monto
    const userMakeTransfer = await User.findOne({
      where: {
        id: senderUserId,
        status: 'active',
      },
    });

    // verificar si el monto a transferir es mayor al monto que tiene el UserMake transfer enviar error 400
    if (amount > userMakeTransfer.amount) {
      return res.status(400).json({
        status: 'error',
        message: 'insufficient amount 😖🤷‍♂️',
      });
    }

    //verificar si el id del usuario que recibe es igual al id del usuario que enviar, enviar un error

    if (receiverUserId === senderUserId) {
      return res.status(400).json({
        status: 'error',
        message: 'cannot transfer to yourself 😒😐😡',
      });
    }

    //Descuento al usuario que envió la transferencia
    const newAmountUserMakeTransfer = userMakeTransfer.amount - amount;

    //Sumar el monto restado en el paso anterior al usuario que recibe la transferencia
    const newAmountUserReceiver = UserReceiverTransfer.amount + amount;

    //se actualiza la información del usuario que envia con su nuevo amount
    await userMakeTransfer.update({ amount: newAmountUserMakeTransfer });

    //se actualiza la información del usuario que recibe la transferencia

    await UserReceiverTransfer.update({ amount: newAmountUserReceiver });

    //guardar o crear la transferencia en la base de datos
    await Transfer.create({ amount, senderUserId, receiverUserId });

    res.status(200).json({
      status: 'success',
      message: 'The transfer has been created',
      transfer,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'fail',
      message: 'Something went very wrong! 😖😡',
    });
  }
};
