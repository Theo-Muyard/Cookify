export const serverError = (controller, res, error) => {
  res.status(500);
  console.log(`Error on ${controller}`, error.message);
} 