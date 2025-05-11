export const serverError = (controller, res, error) => {
  res.status(500).json({message: "Internal Server Error"});
  console.log(`Error on ${controller}`, error.message);
} 