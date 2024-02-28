const EPS = 0.0001;

function calculateGravitationalForce(m1, m2, distance) {
  return -(m1 * m2) / (distance * distance);
}

function calculateDistance(body1, body2) {
  const dx = body2.x - body1.x;
  const dy = body2.y - body1.y;
  const distance = Math.sqrt(dx * dx + dy * dy + EPS * EPS);
  return {
    dx,
    dy,
    distance,
  };
}

function calculateTimeScalar(coord, dt) {
  return coord * dt;
}

export { calculateGravitationalForce, calculateDistance, calculateTimeScalar };
