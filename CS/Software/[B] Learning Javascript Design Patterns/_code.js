/** Factory Pattern */

class VehicleFactory {
  constructor() {
    this.vehicleClass = Car;
  }

  createVehicle(options) {
    const { type, ...customOptions } = options;
    switch (type) {
      case 'car':
        this.vehicleClass = Car;
        break;
      case 'truck':
        this.vehicleClass = Truck;
        break;
    }
    return new this.vehicleClass(customOptions);
  }
}
const vehicleFactory = new VehicleFactory();
const car = vehicleFactory.createVehicle({
  type: 'car',
  color: 'yellow',
});

/** Abstract Factory Pattern */

class AbstractVehicleFactory {
  constructor() {
    this.types = {};
  }

  getVehicle(type, customOptions) {
    const Vehicle = this.types[type];
    return Vehicle ? new Vehicle(customOptions) : null;
  }

  registerVehicle(type, Vehicle) {
    const proto = Vehicle.prototype;
    if (proto.drive && proto.breakDown) {
      this.types[type] = Vehicle;
    }
  }
}

const abstractVehicleFactory = new AbstractVehicleFactory();
abstractVehicleFactory.registerVehicle('car', Car);
const car2 = vehicleFactory.getVehicle('car', {
  color: 'yellow',
});

////////////////////////////////////////////
