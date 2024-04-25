import { useEffect, useState } from "react";

import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import { api } from "@/services/api";

import { EditCategoryModal } from "@/components/Modals/EditCategoryModal";


type CategoriesPagination = GenericPagination<Category>; 

export function Categories()
{
    const [selectedCategory, setSelectedCategory] = useState<Category>({} as Category);

    const [showEditCategoryModal, setShowEditCategoryModal] = useState(false);
    function handleShowEditCategoryModal(category: Category) {
        setSelectedCategory(category);
        setShowEditCategoryModal(true);
    }
    const handleCloseEditCategoryModal = () => setShowEditCategoryModal(false);

    const [categoriesPagination, setCategoriesPagination] = useState<CategoriesPagination>({} as CategoriesPagination);

    async function fetchCategories() {
        try {
            const { data } = await api.get("/categories");

            setCategoriesPagination(data);
        } catch(error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <Container fluid>
            <EditCategoryModal
                fetchCategories={fetchCategories}
                category={selectedCategory}
                show={showEditCategoryModal} 
                onHide={handleCloseEditCategoryModal}
            />

            <Button className="mb-4">Nova categoria</Button>

            {categoriesPagination.data?.map((category) => (
                <Card className="w-25 px-0">
                    <Card.Header className="bg-green">
                        <Card.Title className="text-light">{category.name}</Card.Title>
                    </Card.Header>

                    <Card.Body>
                        <p>
                            {category.description}
                        </p>
                    </Card.Body>

                    <Card.Footer>
                        <div className="d-flex gap-2">
                            <Button variant="success" onClick={() => handleShowEditCategoryModal(category)}>Editar</Button>
                            <Button variant="danger">Excluir</Button>
                        </div>
                    </Card.Footer>
                </Card>
            ))}
        </Container>
    );
}