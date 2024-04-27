import {React, useEffect} from 'react';
import { Form, Modal, Input, DatePicker, Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const UserForm = ({ isVisible, onCreate, onUpdate, onCancel, initialValues }) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (initialValues) {
            form.setFieldsValue(initialValues);
        }
    }, [initialValues, form]);

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            if (initialValues) {
                await onUpdate(values);
            } else {
                await onCreate(values);
            }
            form.resetFields();
            onCancel();
        } catch (error) {
            console.error('Erro ao submeter o formulário:', error);
        }
    };


    const handleUploadChange = (info) => {
        if (info.file.status === 'done') {
            form.setFieldsValue({ foto2: info.fileList });
        } else if (info.file.status === 'error') {
            console.error(`${info.file.name} upload failed.`);
        }
        if (info.file.status !== 'uploading') {
            form.setFieldsValue({ foto2: info.fileList });
        }
    };
    

    return (
        <Modal
            open={isVisible}
            title={initialValues ? 'Editar Usuário' : 'Criar Usuário'}
            onCancel={() => {
                onCancel();
                form.resetFields();
            }}
            onOk={handleSubmit}
        >
            <Form form={form} initialValues={initialValues}>
                <Form.Item
                    name="nome"
                    label="Nome"
                    rules={[{ required: true, message: 'Por favor, insira o nome' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="data_nascimento2"
                    label="Data de Nascimento"
                    rules={[{ required: true, message: 'Por favor, insira a data de nascimento' }]}
                >
                    <DatePicker format="DD/MM/YYYY" />
                </Form.Item>
                <Form.Item
                    name="foto2"
                    label="Foto perfil"
                    valuePropName="fileList"
                    getValueFromEvent={handleUploadChange}
                    rules={[{ required: !initialValues, message: 'Por favor, insira a foto' }]}
                >
                    <Upload
                        listType="picture"
                        beforeUpload={() => false}
                        accept="image/*"
                        onChange={handleUploadChange}
                    >
                        <Button icon={<UploadOutlined />}>Upload Foto</Button>
                    </Upload>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default UserForm;
