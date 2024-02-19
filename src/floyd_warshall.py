def floyd_warshall(graph):


    # Number of vertices in the graph
    n = len(graph)

    # Initialize distance matrix with the same values as the input graph
    distance_matrix = [row[:] for row in graph]

    # Update distance matrix by considering all intermediate vertices
    for k in range(n):
        for i in range(n):
            for j in range(n):
                # If vertex k is on the shortest path from i to j, update the distance
                if distance_matrix[i][k] + distance_matrix[k][j] < distance_matrix[i][j]:
                    distance_matrix[i][j] = distance_matrix[i][k] + distance_matrix[k][j]

    return distance_matrix

# Example usage:
# Replace 'float('inf')' with the actual weights in your graph
graph = [
    [0, 2, float('inf'), 4],
    [float('inf'), 0, 1, float('inf')],
    [float('inf'), float('inf'), 0, 2],
    [float('inf'), float('inf'), float('inf'), 0],
]

result = floyd_warshall(graph)
for row in result:
    print(row)
