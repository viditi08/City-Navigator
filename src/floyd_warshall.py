# Python implementation of Floyd-Warshall algorithm

def floyd_warshall(graph):
    num_nodes = len(graph)
    
    # Initialize the distance matrix with the given graph
    dist = [[float('inf')] * num_nodes for _ in range(num_nodes)]
    
    for i in range(num_nodes):
        for j in range(num_nodes):
            if i == j:
                dist[i][j] = 0
            elif graph[i][j] != -1:
                dist[i][j] = graph[i][j]
    
    # Floyd-Warshall algorithm
    for k in range(num_nodes):
        for i in range(num_nodes):
            for j in range(num_nodes):
                if dist[i][k] != float('inf') and dist[k][j] != float('inf'):
                    dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j])
    
    return dist

# Example graph representing distances between locations
locations_near_fullerton = [
    'Fullerton, CA',
    'Brea, CA',
    'Placentia, CA',
    'Anaheim, CA',
    'Yorba Linda, CA',
]

graph = [
    [0, 5, 10, -1, -1],
    [5, 0, -1, 15, -1],
    [10, -1, 0, -1, 20],
    [-1, 15, -1, 0, 25],
    [-1, -1, 20, 25, 0],
]

# Call the Floyd-Warshall algorithm and print the result
shortest_distances = floyd_warshall(graph)
print(shortest_distances)
