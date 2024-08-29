import * as Minio from 'minio'

const minioClient = new Minio.Client({
    endPoint: process.env.MINIO_ENDPOINT as string,
    useSSL: true,
    accessKey: process.env.MINIO_ACCESS_KEY as string,
    secretKey: process.env.MINIO_SECRET_KEY as string,
});

export async function saveBufferToMinio(bucketName: string, fileName: string, buffer: Buffer) {
   
        // Check if the bucket exists
        const bucketExists = await minioClient.bucketExists(bucketName);
        if (!bucketExists) {
            // Create the bucket if it does not exist
            await minioClient.makeBucket(bucketName, 'us-east-1'); // Change region as needed
            console.log(`Bucket ${bucketName} created successfully.`);
        }

        // Check the size of the buffer
        const bufferSize = buffer.length; // Get the size of the buffer
        if (bufferSize === 0) {
            throw new Error('Buffer is empty. Cannot upload an empty buffer.');
        }

        // Upload the buffer to the bucket
       
        await minioClient.putObject(bucketName, fileName, buffer, bufferSize,{
            'Content-Type': 'image/png'
        });

        
        
        return fileName;
    
}
export async function deleteFileFromMinio(bucketName: string, fileName: string) {
    try {
        // Delete the object from the bucket
        await minioClient.removeObject(bucketName, fileName);
        console.log(`File ${fileName} deleted successfully from bucket ${bucketName}.`);
    } catch (err) {
        console.error('Error deleting file:', err);
        throw new Error(`Failed to delete file ${fileName} from bucket ${bucketName}.`);
    }
}
