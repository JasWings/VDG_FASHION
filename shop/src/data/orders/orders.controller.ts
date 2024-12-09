import { Request, Response } from 'express'; // Assuming you are using Express

// Define a function for creating orders
export async function createOrder(req: Request, res: Response) {
  try {
    // Extract data from the request body
    const createOrderDto = req.body;

    // Call the OrdersService to create the order
    const order = await OrdersService.create(createOrderDto);

    // Return the created order in the response
    res.status(201).json(order);
  } catch (error) {
    // Handle errors and send an error response
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Define a function for getting orders
export async function getOrders(req: Request, res: Response) {
  try {
    // Extract query parameters from the request
    const query = req.query;

    // Call the OrdersService to get orders
    const orderPaginator = await OrdersService.getOrders(query);

    // Return the orders in the response
    res.status(200).json(orderPaginator);
  } catch (error) {
    // Handle errors and send an error response
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Define a function for getting an order by ID
export async function getOrderById(req: Request, res: Response) {
  try {
    // Extract the order ID from the request parameters
    const id = req.params.id;

    // Call the OrdersService to get the order by ID
    const order = await OrdersService.getOrderByIdOrTrackingNumber(Number(id));

    // Return the order in the response
    res.status(200).json(order);
  } catch (error) {
    // Handle errors and send an error response
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Define a function for updating an order
export async function updateOrder(req: Request, res: Response) {
  try {
    // Extract the order ID from the request parameters
    const id = req.params.id;

    // Extract data from the request body
    const updateOrderDto = req.body;

    // Call the OrdersService to update the order
    const updatedOrder = await OrdersService.update(+id, updateOrderDto);

    // Return the updated order in the response
    res.status(200).json(updatedOrder);
  } catch (error) {
    // Handle errors and send an error response
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Define a function for deleting an order
export async function removeOrder(req: Request, res: Response) {
  try {
    // Extract the order ID from the request parameters
    const id = req.params.id;

    // Call the OrdersService to remove the order
    await OrdersService.remove(+id);

    // Send a success response
    res.status(204).send();
  } catch (error) {
    // Handle errors and send an error response
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Define a function for verifying checkout
export async function verifyCheckout(req: Request, res: Response) {
  try {
    // Extract query parameters from the request
    const query = req.query;

    // Call the OrdersService to verify checkout
    const result = await OrdersService.verifyCheckout(query);

    // Return the result in the response
    res.status(200).json(result);
  } catch (error) {
    // Handle errors and send an error response
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
