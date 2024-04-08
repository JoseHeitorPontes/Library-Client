import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { Card, Container, Row } from "react-bootstrap";

type CategoriesPagination = GenericPagination<Category>; 

export function Categories()
{
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
                {categoriesPagination.data?.map((category) => (
                    <Card className="w-25 px-0">
                        <Card.Header>
                            <Card.Title>{category.name}</Card.Title>
                        </Card.Header>
                    </Card>
                ))}
        </Container>
    );
}