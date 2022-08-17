type Chunks = AsyncIterable<Buffer>;

interface IRequest {
  filename: string;
  socket_id: string;
}

export default function handleOnData({ filename, socket_id }: IRequest) {
  return async function* chunkData(chunks: Chunks): AsyncGenerator {
    // let processedAlready = 0;

    for await (const chunk of chunks) {
      yield chunk;

      // processedAlready += chunk.length;

      // console.log(`File [${filename}] got ${formatBytes(processedAlready)}`);
    }
  };
}
