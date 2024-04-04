interface ShapeRenderer<T extends SDFShape> {
    render(shape: T): void;
}